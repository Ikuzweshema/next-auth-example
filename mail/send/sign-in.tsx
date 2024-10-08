import sendMail from "@/mail/send";
import { render } from "@react-email/render";
import SignInRequestEmail from "@/mail/templates/sign-in-request";
/**
 * sendSignIn VeriFication
 * @param url {string} The domain url
 * @param email {string} The recever's Email.
 * @param expires {Date} The Expiration date.
 */
async function sendSignInVerification(
  url: string,
  email: string,
  expires: Date
) {
  try {
    const { host } = new URL(url);
    const subject = `Signin To ${host}`;
    const text = `Continue to your account`;
    const html = await render(
      <SignInRequestEmail expires={expires} url={url} />
    );
    await sendMail(email, subject, text, html);
    return;
  } catch (e) {
    throw new Error("Something went wrong");
  }
}

export default sendSignInVerification;
