import { NextResponse } from "next/server";

type Booking = {
  name: string;
  firm?: string;
  email: string;
  phone?: string;
  day?: string;
  slot?: string;
};

export async function POST(req: Request) {
  let body: Booking;
  try {
    body = (await req.json()) as Booking;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const summary = [
    "Demo booking",
    `Name: ${body.name}`,
    `Firm: ${body.firm || "-"}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone || "-"}`,
    `Day: ${body.day || "-"}`,
    `Slot: ${body.slot || "-"}`,
  ].join("\n");

  if (key && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      await resend.emails.send({
        from: "ArchiFlask <onboarding@resend.dev>",
        to,
        subject: `New demo booking, ${body.name}`,
        text: summary,
      });
    } catch (e) {
      console.error("[book-demo] email failed, logging instead:", e, "\n", summary);
    }
  } else {
    // TODO: configure RESEND_API_KEY + BOOKING_TO_EMAIL in .env.local for production email.
    console.log("[book-demo] (no email configured)\n" + summary);
  }

  return NextResponse.json({ ok: true });
}
