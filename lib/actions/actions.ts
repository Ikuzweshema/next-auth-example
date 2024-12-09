import "server-only"
import { prisma } from "../db";
import bcrypt from "bcryptjs";
import { AuthStatus } from "../types";
import { generateToken } from "../utils";
import { sendVerificationTokenEmail } from "@/mail/send/verification-token";
import { Prisma } from "@prisma/client";
async function getUserByCredentials(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) return null;
    return user;
  } catch (e) {
    return null;
  }
}

async function getPasswordTokenByToken(token: string) {
  const passwordResetToken = await prisma.passwordResetToken.findFirst({
    where: {
      token,
    },
  });
  return passwordResetToken;
}

async function getPasswordTokenByEmail(email: string) {
  const passwordResetToken = await prisma.passwordResetToken.findFirst({
    where: {
      user: {
        email: email,
      },
    },
  });
  return passwordResetToken;
}

async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    return null;
  }
}

async function resendVerificationToken({
  id,
  email,
  name,
}: {
  id: string;
  email: string | null;
  name: string | null;
}): Promise<AuthStatus> {
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId: id,
    },
  });
  return await sendVerificationToken({ id, name, email });
}

async function sendVerificationToken({
  id,
  email,
  name,
}: {
  id: string;
  email: string | null;
  name: string | null;
}): Promise<AuthStatus> {
  const token = await generateToken();
  await prisma.emailVerificationToken.create({
    data: {
      userId: id,
      token: token,
      expires: new Date(Date.now() + 3600 * 1000),
    },
  });
  return await sendVerificationTokenEmail(
    name || "",
    token,
    email || "",
    "Thanks For Registration to Next-Auth-Example",
    "Please Confirm Your Email to continue to Next-Auth-Example"
  );
}
async function getUserByEmail(
  email: string
): Promise<Prisma.UserCreateInput | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) return null;

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getTokenByToken(token: string | null) {
  if (!token) {
    return null;
  }
  const verificationToken = await prisma.emailVerificationToken.findFirst({
    where: {
      token: token,
    },
  });
  if (!verificationToken) {
    return null;
  }
  return verificationToken;
}

export {
  getUserById,
  getUserByCredentials,
  getTokenByToken,
  getUserByEmail,
  getPasswordTokenByEmail,
  sendVerificationToken,
  resendVerificationToken,
  getPasswordTokenByToken
};
