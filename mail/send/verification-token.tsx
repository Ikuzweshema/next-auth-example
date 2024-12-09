import "server-only";
import { render } from "@react-email/render";
import EmailTemplate from "@/mail/templates/verify";
import sendMail from "@/mail/send/index";
import { MailStatus } from "@/lib/types";

export async function sendVerificationTokenEmail(
  username: string,
  verificationToken: string,
  to: string,
  subject: string,
  text: string
): Promise<MailStatus> {
  const html = await render(
    <EmailTemplate username={username} verificationToken={verificationToken} />
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
