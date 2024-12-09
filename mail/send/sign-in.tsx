import "server-only"
import sendMail from "@/mail/send";
import { render } from "@react-email/render";
import SignInRequestEmail from "@/mail/templates/sign-in-request";
async function sendSignInVerification(
  url: string,
  email: string,
  expires: Date
) {
  try {
    const { host } = new URL(url);
    const subject = `Continue To ${host}`;
    const text = `Please Verify Email to Continue to Your account<`;
    const html = await render(
      <SignInRequestEmail expires={expires} url={url} />
    );
    await sendMail(email, subject, text, html);
    return;
  } catch (e) {
    throw new Error("Something went wrong");
  }
}


export {sendSignInVerification}