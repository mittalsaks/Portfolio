const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'onboarding@resend.dev';
const OWNER_NAME = process.env.OWNER_NAME || 'Sakshi Mittal';
const OWNER_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

const sendContactEmail = async ({ name, email, subject, message }) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
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
      </div>
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Got your message, ${name}! 👋`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #6366f1;">Hey ${name}, thanks for reaching out!</h2>
        <p>I've received your message about <strong>"${subject}"</strong> and will get back to you soon.</p>
        <blockquote style="border-left: 3px solid #6366f1; padding-left: 12px; color: #6b7280; margin: 16px 0;">${message}</blockquote>
        <p>Talk soon,<br/><strong>${OWNER_NAME}</strong></p>
      </div>
    `,
  });
};

const sendOtpEmail = async (to, otp) => {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `🔐 Your admin login code: ${otp}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #6366f1;">Admin Login Verification</h2>
        <p>Your one-time login code:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; text-align: center; padding: 16px; background: #f9fafb; border-radius: 6px;">${otp}</p>
        <p style="color: #6b7280; font-size: 14px;">Expires in 10 minutes.</p>
      </div>
    `,
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
};

const sendPasswordResetEmail = async (to, resetUrl) => {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: '🔑 Reset your admin password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #6366f1;">Password Reset Request</h2>
        <p style="text-align: center; margin: 24px 0;">
          <a href="${resetUrl}" style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Reset Password</a>
        </p>
        <p style="color: #6b7280; font-size: 13px;">Or copy: ${resetUrl}</p>
        <p style="color: #6b7280; font-size: 14px;">Expires in 10 minutes.</p>
      </div>
    `,
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
};

module.exports = { sendContactEmail, sendOtpEmail, sendPasswordResetEmail };