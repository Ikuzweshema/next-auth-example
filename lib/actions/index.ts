"use server";
import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";
import { AuthStatus, RegisterState, userSchema } from "@/lib/definitions";
import { ZodError } from "zod";
import { prisma } from "@/lib/db/db";
import bcrypt from "bcryptjs";
import sendMail from "@/mail/send";
import generateToken from "@/lib/token";
import { BuiltInProviderType } from "@auth/core/providers";
import { Prisma} from "@prisma/client";

/**
 * Function Authenticate
 *
 * @param prevState The Previous login status
 * @param formData The formData from submitted form
 * @return {AuthStatus} The Login status
 */
export async function authenticate(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  const email = formData.get("email");
  try {
    await signIn("credentials", formData);
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            message: "Invalid Credentials",
          };
        case "AccessDenied":
          const user = await findUserByEmail(email);
          if (!user || user.emailVerified) {
            return {
              status: "error",
              message: "something went wrong",
            };
          } else {
            return resendVerificationToken({
              id: user.id,
              name: user.name,
              email: user.email,
            });
          }
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

export async function findUserByCredentials(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) return null;
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
  formData: FormData
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
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashed,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return await sendVerificationToken({
      name: newUser.name,
      id: newUser.id,
      email: newUser.email,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "All Fields are Required",
        errors: e.flatten().fieldErrors,
      };
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002" && e.meta?.target?.includes("email")) {
        return {
          status: "error",
          message: "Email already exists",
        };
      } else {
        return {
          status: "error",
          message: "Database error",
        };
      }
    }
    return {
      status: "error",
      message: e.message,
    };
  }
}
export async function verifyToken(token: string): Promise<AuthStatus> {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token: token },
      select: {
        userId: true,
        token: true,
        expires: true,
      },
    });
    if (!verificationToken) {
      return {
        status: "error",
        message: "Verification token not found",
      };
    }
    const hasExpired =
      new Date(Date.now()) > new Date(verificationToken.expires);
    if (hasExpired) {
      return {
        status: "error",
        message: "Token Expired Please get Anew One",
      };
    }

    await prisma.user.update({
      where: {
        id: verificationToken.userId,
      },
      data: {
        emailVerified: new Date(Date.now()),
      },
    });
    await prisma.verificationToken.deleteMany({
      where: {
        userId: verificationToken.userId,
      },
    });

    return {
      status: "success",
      message: "Email Verified Successfully, Please Login",
    };
  } catch (e: Error) {
    return {
      status: "error",
      message: e.message,
    };
  }
}
export default async function signInWithProvider(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
    const provider: BuiltInProviderType | undefined = formData.get("provider");
    await signIn(provider);
    return {
      status: "success",
      message: "login successfully",
    };
  } catch (e: Error) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "OAuthCallbackError":
          return {
            status: "error",
            message: e.message,
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
async function findUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) return null;

  return user;
}
async function sendVerificationToken({
  id,
  email,
  name,
}: {
  id: string;
  email: string;
  name: string;
}): Promise<AuthStatus> {
  const token = await generateToken();
  await prisma.verificationToken.create({
    data: {
      userId: id,
      token: token,
      expires: new Date(Date.now() + 3600 * 1000),
    },
  });
  return await sendMail(
    email,
    "Thanks For Registration to Next-Auth-Example",
    "Please Confirm Your Email to continue to Next-Auth-Example",
    name,
    token
  );
}
async function resendVerificationToken({
  id,
  email,
  name,
}: {
  id: string;
  email: string;
  name: string;
}): Promise<AuthStatus> {
  await prisma.verificationToken.deleteMany({
    where: {
      userId: id,
    },
  });
  return await sendVerificationToken({ id, name, email });
}
export async function getUserByAndResend(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  const token = formData.get("token");
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token: token,
    },
    select: {
      userId: true,
    },
  });
  if (!verificationToken) {
    return {
      status: "error",
      message: "No user found",
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: verificationToken.userId,
    },
  });
  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }
  return await resendVerificationToken({ id: user.id, email: user.email });
}
