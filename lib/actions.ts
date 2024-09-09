import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";
import { LoginState } from "@/lib/definitions";
import { prisma } from "@/lib/db/db";
/**
 * Function Authenticate
 *
 * @param prevState The Previous login status
 * @param formData The formData from submitted form
 * @return LoginState
 */
export async function authenticate(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const { email, password } = formData;
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return {
            status: "success",
            message: "Login Successful",
          };
        default:
          return {
            status: "error",
            message: "something went wrong",
          };
      }
    }
    throw e;
  }
}

export async function findUser(email: string, password: string) {
  try {
    const user = prisma.user.findFirst({
      where: { email: email, password: password },
    });
    if (!user) return null;
  } catch (e) {
    return null;
  }
}
