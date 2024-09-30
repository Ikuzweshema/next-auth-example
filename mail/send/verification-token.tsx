"use server"
/**
 * send Verification toke
 * This function sends an email and takes the following parameters
 * @param verificationToken {string} The verification token
 * @param to {string} The receiver's email address
 * @param subject {string} The email subject
 * @param text {string} The email text
 * @param username {string} The username
 * @return {MailStatus} Mail Status
 *
 */
import { render } from "@react-email/render";
import EmailTemplate from "@/mail/templates/verify";
import sendMail from "@/mail/send/index";
import { MailStatus } from "@/lib/types";

export async function sendVerificationTokenEmail(
  username: string,
  verificationToken: string,
  to: string,
  subject: string,
  text: string,
): Promise<MailStatus> {
  const html = await render(
    <EmailTemplate username={username} verificationToken={verificationToken} />,
  );
  try {
    await sendMail(to, subject, text, html);
    return {
      status: "success",
      message: "Please Verify your Email",
    };
  } catch (e) {
    return {
      status: "error",
      message: "verification Email not sent",
    };
  }
}
