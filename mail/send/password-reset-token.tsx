import { MailStatus } from "@/lib/types";
import sendMail from "@/mail/send";
import { render } from "@react-email/render";
import PasswordResetEmail from "../templates/password-reset";

/**
 * send Password Reset token.
 * This function sends an email.
 * @param username {string} The username
 * @param passowrdResetToken {string} The verification token
 * @param to {string} The receiver's email address
 * @return {MailStatus} Mail Status
 *
 */
export async function sendPaswordResetTokenEmail(
    username: string,
    passowrdResetToken: string,
    to: string,

): Promise<MailStatus> {
    try {
        const html = await render(<PasswordResetEmail username={username} passwordResetToken={passowrdResetToken} />)
        await sendMail(to, "Password Reset Link", "Continue to recover your Password", html)
        return {
            status: "success",
            message: "Check your email To continue  "
        }
    } catch (err) {

        return {
            status: "error",
            message: "Email not Sent"
        }
    }


}