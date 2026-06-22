const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "onboarding@resend.dev";
const OWNER_NAME = process.env.OWNER_NAME || "Sakshi Mittal";
const EMAIL_TO = process.env.EMAIL_TO || process.env.EMAIL_USER;

const sendContactEmail = async ({ name, email, subject, message }) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: EMAIL_TO,
    subject: `New Contact: ${subject}`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;"><h2 style="color:#6366f1;">New message from your portfolio</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p></div>`,
  });
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Got your message, ${name}!`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;"><h2 style="color:#6366f1;">Hey ${name}, thanks for reaching out!</h2><p>I received your message about <strong>"${subject}"</strong> and will get back to you soon.</p><p>Talk soon,<br/><strong>${OWNER_NAME}</strong></p></div>`,
  });
};

const sendOtpEmail = async (to, otp) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Your admin login code: ${otp}`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;"><h2 style="color:#6366f1;">Admin Login Verification</h2><p>Use this code to finish logging in:</p><p style="font-size:32px;font-weight:bold;letter-spacing:6px;text-align:center;padding:16px;background:#f9fafb;border-radius:6px;">${otp}</p><p style="color:#6b7280;font-size:14px;">This code expires in 10 minutes.</p></div>`,
  });
};

const sendPasswordResetEmail = async (to, resetUrl) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Reset your admin password",
    html: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;"><h2 style="color:#6366f1;">Password Reset Request</h2><p>Click below to reset your password:</p><p style="text-align:center;margin:24px 0;"><a href="${resetUrl}" style="background:#6366f1;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Reset Password</a></p><p style="color:#6b7280;font-size:14px;">This link expires in 10 minutes.</p></div>`,
  });
};

module.exports = { sendContactEmail, sendOtpEmail, sendPasswordResetEmail };
