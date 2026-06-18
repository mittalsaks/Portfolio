const nodemailer = require("nodemailer");

// FIX: was process.env.EMAIL_PASS — your .env.example defines
// EMAIL_APP_PASSWORD, so this must match exactly or Gmail auth fails silently.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password (not your real password)
  },
});

const sendContactEmail = async ({ name, email, subject, message }) => {
  // Fail loudly and early if env vars are missing, instead of nodemailer
  // throwing a cryptic auth error deep inside sendMail().
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error(
      "EMAIL_USER or EMAIL_APP_PASSWORD is not set. Check your .env (local) or Vercel Project Settings -> Environment Variables (production)."
    );
  }

  // Email to YOU (portfolio owner) — notification
  const ownerMail = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `📩 New Contact: ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #6366f1;">New message from your portfolio</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 80px;"><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Subject</strong></td><td>${subject}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Sent via your portfolio contact form</p>
      </div>
    `,
  };

  // Auto-reply to the SENDER
  const senderMail = {
    from: `"${process.env.OWNER_NAME || "Sakshi Mittal"}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Got your message, ${name}! 👋`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #6366f1;">Hey ${name}, thanks for reaching out!</h2>
        <p>I've received your message about <strong>"${subject}"</strong> and will get back to you as soon as possible — usually within 24–48 hours.</p>
        <blockquote style="border-left: 3px solid #6366f1; padding-left: 12px; color: #6b7280; margin: 16px 0;">
          ${message}
        </blockquote>
        <p>Talk soon,<br/><strong>${process.env.OWNER_NAME || "Sakshi Mittal"}</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(ownerMail);
  await transporter.sendMail(senderMail);
};

module.exports = { sendContactEmail };