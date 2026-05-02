import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: "iampreetdave@gmail.com",
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fafafa;border:1px solid rgba(255,255,255,0.1);border-radius:12px;">
          <h2 style="color:#C9A86A;font-size:18px;margin:0 0 20px;">New Portfolio Contact</h2>
          <p style="margin:0 0 8px;"><strong style="color:rgba(255,255,255,0.5);">From:</strong> ${name}</p>
          <p style="margin:0 0 16px;"><strong style="color:rgba(255,255,255,0.5);">Email:</strong> <a href="mailto:${email}" style="color:#C9A86A;">${email}</a></p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:16px 0;" />
          <p style="color:rgba(255,255,255,0.5);margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
          <p style="white-space:pre-wrap;color:rgba(250,250,250,0.75);line-height:1.7;">${message}</p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"Preet Dave" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Got your message! — Preet Dave",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fafafa;border:1px solid rgba(255,255,255,0.1);border-radius:12px;">
          <h2 style="color:#C9A86A;font-size:18px;margin:0 0 16px;">Thanks, ${name}!</h2>
          <p style="color:rgba(250,250,250,0.75);line-height:1.8;margin:0 0 20px;">I received your message and will get back to you as soon as possible.</p>
          <p style="color:rgba(250,250,250,0.4);font-size:12px;margin:0;">— Preet Dave · AI / ML Engineer</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
