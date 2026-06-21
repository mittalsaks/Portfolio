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

// Sends the 6-digit login OTP to the admin's own email.
// Reuses the same transporter/env vars as the contact form — no new setup needed.
const sendOtpEmail = async (to, otp) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error(
      "EMAIL_USER or EMAIL_APP_PASSWORD is not set. Check your .env (local) or Vercel Project Settings -> Environment Variables (production)."
    );
  }

  const mail = {
    from: `"Portfolio Admin Login" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🔐 Your admin login code: ${otp}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #6366f1;">Admin Login Verification</h2>
        <p>Use this code to finish logging in to your portfolio admin dashboard:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; text-align: center; padding: 16px; background: #f9fafb; border-radius: 6px;">
          ${otp}
        </p>
        <p style="color: #6b7280; font-size: 14px;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mail);
};

// Sends a password reset link to the admin's own email.
const sendPasswordResetEmail = async (to, resetUrl) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error(
      "EMAIL_USER or EMAIL_APP_PASSWORD is not set. Check your .env (local) or Vercel Project Settings -> Environment Variables (production)."
    );
  }

  const mail = {
    from: `"Portfolio Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🔑 Reset your admin password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #6366f1;">Password Reset Request</h2>
        <p>We received a request to reset your portfolio admin password. Click the button below to set a new one:</p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="${resetUrl}" style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p style="color: #6b7280; font-size: 13px; word-break: break-all;">
          Or copy this link: ${resetUrl}
        </p>
        <p style="color: #6b7280; font-size: 14px;">This link expires in 10 minutes. If you didn't request this, you can safely ignore this email — your password won't change.</p>
      </div>
    `,
  };

  await transporter.sendMail(mail);
};

module.exports = { sendContactEmail, sendOtpEmail, sendPasswordResetEmail };