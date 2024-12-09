import "server-only"
import { MailStatus } from "@/lib/types";
import sendMail from "@/mail/send";
import { render } from "@react-email/render";
import PasswordResetEmail from "../templates/password-reset";

export async function sendPaswordResetTokenEmail(
  username: string,
  passowrdResetToken: string,
  to: string
): Promise<MailStatus> {
  try {
    const html = await render(
      <PasswordResetEmail
        username={username}
        passwordResetToken={passowrdResetToken}
      />
    );
    await sendMail(
      to,
      "Password Reset Link",
      "Continue to recover your Password",
      html
    );
    return {
      status: "success",
      message: "Check your email To continue  ",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Email not Sent",
    };
  }
}
