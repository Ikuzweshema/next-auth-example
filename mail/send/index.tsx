import "server-only"
import sendGrid from "@sendgrid/mail";
sendGrid.setApiKey(process.env.SEND_GRID_API_KEY || "");
export default async function sendMail(
  to: string,
  subject: string,
  text: string,
  html: string,
) {
  try {
    await sendGrid.send({
      to: to,
      from: process.env.MAIL_FROM || "",
      subject: subject,
      text: text,
      html: html,
    });
  } catch (e) {
    throw new Error("Email not sent");
  }
}
