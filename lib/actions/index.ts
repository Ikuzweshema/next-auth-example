"use server";
import { signIn } from "@/app/auth";
import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/utils";
import { sendPaswordResetTokenEmail } from "@/mail/send/password-reset-token";
import { BuiltInProviderType } from "@auth/core/providers";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z, ZodError } from "zod";
import {
  getUserById,
  getPasswordTokenByEmail,
  getTokenByToken,
  getUserByEmail,
  sendVerificationToken,
  resendVerificationToken,
  getPasswordTokenByToken,
} from "@/lib/actions/actions";
import {
  AuthStatus,
  loginSchema,
  passwordResetSchema,
  RegisterState,
  userSchema,
} from "../types";

export async function authenticate(
  callbackUrl: string | null,
  prevState: AuthStatus | undefined,

  formData: FormData
): Promise<AuthStatus> {
  const validate = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validate.success) {
    return {
      status: "error",
      message: validate.error.errors[0].message,
    };
  }
  const { email, password } = validate.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/dashboard",
    });
    return {
      status: "success",
      message: "login successfully",
    };
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            message: "Invalid Credentials",
          };
        case "AccessDenied":
          const user = await getUserByEmail(email);
          if (!user || user.emailVerified) {
            return {
              status: "error",
              message: "something went wrong",
            };
          }
          return resendVerificationToken({
            id: user.id as string,
            name: user.name as string,
            email: user.email as string,
          });

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
      if (e.code === "P2002") {
        return {
          status: "error",
          message: "Email already exists",
        };
      } else {
        return {
          status: "error",
          message: e.message,
        };
      }
    }
    return {
      status: "error",
      message: "Something Went wrong",
    };
  }
}

export async function verifyToken(token: string): Promise<AuthStatus> {
  try {
    const verificationToken = await getTokenByToken(token);
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
    await prisma.emailVerificationToken.deleteMany({
      where: {
        userId: verificationToken.userId,
      },
    });

    return {
      status: "success",
      message: "Email Verified Successfully, Please Login",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        status: "error",
        message: e.message,
      };
    }
    return {
      message: "something Went wrong",
      status: "error",
    };
  }
}

export default async function signInWithProvider(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
    const provider = formData.get("provider") as BuiltInProviderType;
    await signIn(provider);
    return {
      status: "success",
      message: "login successfully",
    };
  } catch (e) {
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
export async function getUserAndResendToken(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  const token = formData.get("token") as string | null;
  const verificationToken = await getTokenByToken(token);
  if (!verificationToken) {
    return {
      status: "error",
      message: "No user found",
    };
  }
  const user = await getUserById(verificationToken.userId);
  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }
  return await resendVerificationToken({
    email: user.email as string,
    id: user.id as string,
    name: user.name as string,
  });
}

export async function sendPasswordResetToken(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
    const validate = z
      .string()
      .email({
        message: "Invalid Email",
      })
      .safeParse(formData.get("email"));
    if (!validate.success) {
      return {
        status: "error",
        message: validate.error.errors[0].message,
      };
    }
    const email = validate.data;
    const user = await getUserByEmail(email);
    if (!user) {
      return {
        status: "error",
        message: "User not found",
      };
    }
    const existingToken = await getPasswordTokenByEmail(email);
    if (existingToken) {
      await prisma.passwordResetToken.deleteMany({
        where: {
          userId: existingToken.userId,
        },
      });
    }
    const token = await generateToken();
    await prisma.passwordResetToken.create({
      data: {
        token: token,
        expires: new Date(Date.now() + 3600 * 1000),
        userId: user.id as string,
      },
    });
    return await sendPaswordResetTokenEmail(
      user.name as string,
      token,
      user.email as string
    );
  } catch (e) {
    return {
      status: "error",
      message: "Password reset link not sent",
    };
  }
}

export async function verifyPasswordToken(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus | undefined> {
  try {
    const validate = passwordResetSchema.safeParse({
      token: formData.get("token"),
      password: formData.get("password"),
      cpassword: formData.get("cpassword"),
    });
    if (!validate.success) {
      return {
        status: "error",
        message: validate.error.errors[0].message,
      };
    }
    const { password, token } = validate.data;

    const passwordResetToken = await getPasswordTokenByToken(token);
    if (!passwordResetToken) {
      return {
        status: "error",
        message: "Verification token not found",
      };
    }
    const hasExpired =
      new Date(passwordResetToken.expires) < new Date(Date.now());
    if (hasExpired) {
      return {
        status: "error",
        message: "Password reset token has expired",
      };
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: passwordResetToken.userId,
      },
      data: {
        password: hashed,
      },
    });
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: passwordResetToken.userId,
      },
    });

    return {
      status: "success",
      message: "Password updated successfully",
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "validation failed",
      };
    }
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export async function updateUser(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
    const validate = await userSchema
      .omit({
        password: true,
      })
      .extend({
        id: z.string(),
        enabled: z.coerce.boolean(),
      })
      .safeParse({
        email: formData.get("email"),
        name: formData.get("name"),
        id: formData.get("id"),
        enabled: formData.get("enabled"),
      });
    if (!validate.success) {
      return {
        status: "error",
        message: validate.error.errors[0].message,
      };
    }

    const { email, name, id, enabled } = validate.data;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: email,
        name: name,
        twoFactorEnabled: enabled,
      },
    });
    return {
      status: "success",
      message: "Profile updated",
    };
  } catch (e) {
    return {
      status: "error",
      message: "something went wrong",
    };
  }
}

export async function signInWithSendgrid(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
    await signIn("sendgrid", formData);
    return {
      status: "success",
      message: "login sucess",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "Verification":
          return {
            status: "error",
            message: "Email verification error",
          };
        default:
          return {
            status: "error",
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
}

export async function connectProvider(
  prevSate: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
    const provider = formData.get("provider") as BuiltInProviderType;
    return await signIn(provider, {
      redirectTo: "/dashboard/settings",
    });
  } catch (e) {
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

export async function removeProvider(
  prevSate: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
    const provider = formData.get("provider") as string;
    const userId = formData.get("userId") as string;

    await prisma.account.deleteMany({
      where: {
        AND: [
          {
            userId: userId,
            provider: provider,
          },
        ],
      },
    });
    return {
      message: "Account Disconnected",
      status: "success",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        message: "Account not disconnected",
        status: "error",
      };
    }
    return {
      message: "Something went wrong",
      status: "error",
    };
  }
}
