"use server";
import sendGrid from "@sendgrid/mail";
import React from "react";
import { MailStatus } from "@/lib/definitions";
import { render } from "@react-email/render";
sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
import EmailTemplate from "@/mail/templates/verify";

/**
 * sendMail function
 * This Function Send Email And takes the following parameters
 * @param to {string} The receiver's Email Address
 * @param subject {string} The Email Subject
 * @param text {string} The Email Text
 * @param verificationToken {string} The Verification token
 * @param username {string} The username
 // * @param html {React.ReactNode} The Email Html
 */
export default async function sendMail(
  to: string,
  subject: string,
  text: string,
  username: string,
  verificationToken: string,
): Promise<MailStatus> {
  const html = await render(EmailTemplate({ username, verificationToken }));
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
      message: "Please Verify you Email ",
    };
  } catch (e: Error) {
    return {
      status: "error",
      message: e.message,
    };
  }
}
