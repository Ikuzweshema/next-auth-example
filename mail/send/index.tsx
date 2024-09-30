"use server";
import sendGrid from "@sendgrid/mail";
sendGrid.setApiKey(process.env.SEND_GRID_API_KEY || "");

/**
 * sendMail function
 * This function sends an email and takes the following parameters
 * @param to {string} The receiver's email address
 * @param subject {string} The email subject
 * @param text {string} The email text
 * @param html {string} The Email Text
 */
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
