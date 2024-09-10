"use server";
import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";
import { LoginState, RegisterState, userSchema } from "@/lib/definitions";
import { ZodError } from "zod";
import { prisma } from "@/lib/db/db";
/**
 * Function Authenticate
 *
 * @param prevState The Previous login status
 * @param formData The formData from submitted form
 * @return {LoginState} The Login status
 */
export async function authenticate(
  prevState: LoginState|undefined,
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
    return user;
  } catch (e) {
    return null;
  }
}

/**
 *
 * @param prevSate The registration status
 * @param formData  The  data from the form
 * @return{RegisterState} the status of registration process
 */
export async function addUser(
  prevSate: RegisterState | undefined,
  formData: FormData,
): Promise<RegisterState> {
  try {
    const validate = userSchema.safeParse({
      name: formData.get("name"),
      password: formData.get("password"),
      email: formData.get("email"),
    });
    if (!validate.success) {
      return {
        status: "error",
        message: "All field Are Required",
        errors: validate.error.flatten().fieldErrors,
      };
    }
    const { email, password, name } = validate.data;
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
    return {
      status: "success",
      message: "Registration completed",
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "All Fields are Required",
        errors: e.flatten().fieldErrors,
      };
    }
    return {
      status: "error",
      message: e.message,
    };
  }
}
