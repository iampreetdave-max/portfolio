import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: [payload.to],
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, business, tools, hasSetup, description, budget, timeline } = await req.json();

    if (!name?.trim() || !email?.trim() || !description?.trim()) {
      return NextResponse.json({ error: "Name, email, and description are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const toolsList = Array.isArray(tools) && tools.length > 0 ? tools.join(", ") : "Not specified";

    await sendEmail({
      to: "iampreetdave@gmail.com",
      replyTo: email,
      subject: `Automation Request from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fafafa;border:1px solid rgba(255,255,255,0.1);border-radius:12px;">
          <h2 style="color:#C9A86A;font-size:18px;margin:0 0 20px;">New Automation Request</h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);width:150px;vertical-align:top;">Name</td><td style="padding:6px 0;">${name}</td></tr>
            <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);vertical-align:top;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#C9A86A;">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);vertical-align:top;">Business / Use Case</td><td style="padding:6px 0;">${business || "Not specified"}</td></tr>
            <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);vertical-align:top;">Current Tools</td><td style="padding:6px 0;">${toolsList}</td></tr>
            <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);vertical-align:top;">Existing Setup</td><td style="padding:6px 0;">${hasSetup === "yes" ? "Yes" : "No"}</td></tr>
            <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);vertical-align:top;">Budget Range</td><td style="padding:6px 0;">${budget || "Not specified"}</td></tr>
            <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);vertical-align:top;">Timeline</td><td style="padding:6px 0;">${timeline || "Not specified"}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:16px 0;" />
          <p style="color:rgba(255,255,255,0.4);margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">What they need automated</p>
          <p style="white-space:pre-wrap;color:rgba(250,250,250,0.75);line-height:1.7;">${description}</p>
        </div>
      `,
    });

    await sendEmail({
      to: email,
      subject: "Automation Request Received · Preet Dave",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fafafa;border:1px solid rgba(255,255,255,0.1);border-radius:12px;">
          <h2 style="color:#C9A86A;font-size:18px;margin:0 0 16px;">Request Received, ${name}!</h2>
          <p style="color:rgba(250,250,250,0.75);line-height:1.8;margin:0 0 12px;">I've reviewed the details of your automation request. I'll get back to you within <strong>48 hours</strong> with a quote, including estimated timeline and pricing.</p>
          <p style="color:rgba(250,250,250,0.55);line-height:1.7;font-size:13px;margin:0 0 20px;">If you have any additional details, feel free to reply to this email.</p>
          <p style="color:rgba(250,250,250,0.4);font-size:12px;margin:0;">Preet Dave · Automation Developer</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Automation request error:", error);
    return NextResponse.json({ error: "Failed to submit request. Please try again." }, { status: 500 });
  }
}
