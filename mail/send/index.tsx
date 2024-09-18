"use server"
import sendGrid from "@sendgrid/mail";
import { MailStatus } from "@/lib/definitions";
import { render } from "@react-email/render";
import EmailTemplate from "@/mail/templates/verify";

sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);

/**
 * sendMail function
 * This function sends an email and takes the following parameters
 * @param to {string} The receiver's email address
 * @param subject {string} The email subject
 * @param text {string} The email text
 * @param verificationToken {string} The verification token
 * @param username {string} The username
 * @return {MailStatus} Mail Status
 */
export default async function sendMail(
  to: string,
  subject: string,
  text: string,
  username: string,
  verificationToken: string
): Promise<MailStatus> {
  const html = await render(
    <EmailTemplate username={username} verificationToken={verificationToken} />
  );

  try {
    await sendGrid.send({
      to: to,
      from: process.env.MAIL_FROM,
      subject: subject,
      text: text,
      html: html,
    });
    return {
      status: "success",
      message: "Please verify your email.",
    };
  } catch (e: Error) {
    console.error("Error sending email:", e.message);
    return {
      status: "error",
      message: e.message,
    };
  }
}
