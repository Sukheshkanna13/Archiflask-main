import { describe, it, expect } from "vitest";
import { POST } from "./route";

let ipCounter = 0;
// Unique IP per request so the in-memory rate limiter doesn't bleed between tests.
function req(body: Record<string, unknown>, ip?: string) {
  return new Request("http://localhost/api/book-demo", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip ?? `10.0.${ipCounter++}.1`,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/book-demo", () => {
  it("rejects missing name or email with 422", async () => {
    const res = await POST(req({ name: "", email: "" }));
    expect(res.status).toBe(422);
  });

  it("rejects a malformed email with 422", async () => {
    const res = await POST(req({ name: "Asha", email: "not-an-email" }));
    expect(res.status).toBe(422);
  });

  it("accepts a valid booking (no email transport configured)", async () => {
    const res = await POST(req({ name: "Asha Rao", email: "asha@firm.com" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("silently accepts when the honeypot is filled (bot)", async () => {
    const res = await POST(
      req({ name: "Bot", email: "bot@x.com", company_website: "spam" }),
    );
    expect(res.status).toBe(200);
  });

  it("rate-limits a burst from one IP", async () => {
    const ip = "203.0.113.7";
    const codes: number[] = [];
    for (let i = 0; i < 7; i++) {
      const res = await POST(req({ name: "A", email: "a@b.com" }, ip));
      codes.push(res.status);
    }
    expect(codes).toContain(429);
  });

  it("returns 400 on invalid JSON", async () => {
    const bad = new Request("http://localhost/api/book-demo", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.9.9.9" },
      body: "{not json",
    });
    const res = await POST(bad);
    expect(res.status).toBe(400);
  });
});
