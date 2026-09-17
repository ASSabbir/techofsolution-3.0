import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────
// Contact form endpoint.
// This validates the submission and returns success so the form works
// out of the box. Wire it up to a real email provider by adding a call
// below — a few common options:
//
//   Resend (recommended, simplest):
//     npm install resend
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     await resend.emails.send({ from, to: process.env.CONTACT_TO_EMAIL, ... });
//
//   SMTP / Nodemailer, or forwarding to EmailJS — same shape, just swap
//   the call inside the try block. Keep any API keys in `.env.local`,
//   never in this file.
// ─────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: send the email/notification here.
    console.log("New contact form submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
