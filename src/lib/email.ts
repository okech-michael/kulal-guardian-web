import { createServerFn } from "@tanstack/react-start";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(2000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      throw new Error("SendGrid is not configured for contact submissions.");
    }

    sgMail.setApiKey(apiKey);

    await sgMail.send({
      to: fromEmail,
      from: fromEmail,
      replyTo: data.email,
      subject: `New contact form message: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p>${data.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return { ok: true };
  });

export async function sendRegistrationEmail(toEmail: string, fullName: string, email: string) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !fromEmail) return;

  sgMail.setApiKey(apiKey);

  await sgMail.send({
    to: toEmail,
    from: fromEmail,
    subject: "Your registration has been received",
    html: `
      <h2>Thank you for registering with Wazee wamazingira</h2>
      <p>We have received your registration details and our team will follow up shortly.</p>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
    `,
  });
}
