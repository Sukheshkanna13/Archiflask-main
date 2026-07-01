import { NextResponse } from "next/server";

// Runs on the Node runtime (server deployment). Validates and rate-limits the
// public booking endpoint before doing any work.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Booking = {
  name: string;
  firm?: string;
  email: string;
  phone?: string;
  day?: string;
  slot?: string;
  message?: string;
  // Honeypot: real users never fill this hidden field; bots usually do.
  company_website?: string;
};

const MAX = { name: 120, firm: 160, email: 200, phone: 40, day: 40, slot: 40, message: 1000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-memory rate limiter. Good enough for a single instance; swap for a
// shared store (Redis / Upstash) if the app scales horizontally.
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60_000; // per minute, per IP
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_LIMIT;
}

const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  // Cap the body size so a malicious payload can't exhaust memory.
  const len = Number(req.headers.get("content-length") || 0);
  if (len > 10_000) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  let body: Booking;
  try {
    body = (await req.json()) as Booking;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot tripped → pretend success so bots don't learn they were caught.
  if (body.company_website && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clip(body.name, MAX.name);
  const email = clip(body.email, MAX.email);
  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  const firm = clip(body.firm, MAX.firm);
  const phone = clip(body.phone, MAX.phone);
  const day = clip(body.day, MAX.day);
  const slot = clip(body.slot, MAX.slot);
  const userMessage = clip(body.message, MAX.message);

  // Integrate with real-time contactUs API
  try {
    const combinedMessage = [
      firm ? `Firm: ${firm}` : "",
      userMessage ? `Message: ${userMessage}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const apiPayload = {
      name,
      email,
      mobile: phone || undefined,
      subject: "ArchiFlask Demo Booking",
      message: combinedMessage || undefined,
      day: day || undefined,
      timeSlot: slot || undefined,
    };

    const apiRes = await fetch("https://wallzehnapi.azurewebsites.net/contactUs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text().catch(() => "");
      console.error("[book-demo] Azure API failed:", apiRes.status, errText);
      return NextResponse.json(
        { error: "Our booking server returned an error. Please try again." },
        { status: 502 },
      );
    }
  } catch (e) {
    console.error("[book-demo] Azure API request failed:", e);
    return NextResponse.json(
      { error: "Unable to reach booking server. Please try again." },
      { status: 503 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const summary = [
    "Demo booking",
    `Name: ${name}`,
    `Firm: ${firm || "-"}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Day: ${day || "-"}`,
    `Slot: ${slot || "-"}`,
    `Message: ${userMessage || "-"}`,
  ].join("\n");

  if (key && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      await resend.emails.send({
        from: "ArchiFlask <onboarding@resend.dev>",
        to,
        subject: `New demo booking, ${name}`,
        text: summary,
      });
    } catch (e) {
      console.error("[book-demo] email failed:", e, "\n", summary);
    }
  } else {
    console.log("[book-demo] (no email configured)\n" + summary);
  }

  return NextResponse.json({ ok: true });
}
