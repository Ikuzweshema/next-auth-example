import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserByCredentials } from "@/lib/actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import Github from "next-auth/providers/github";
import { loginSchema } from "@/lib/types";
import SendGrid from "next-auth/providers/sendgrid";
import sendSignInVerification from "@/mail/send/sign-in";
export const { signOut, signIn, auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    SendGrid({
      from: process.env.MAIL_FROM,
      apiKey: process.env.SEND_GRID_API_KEY,
      sendVerificationRequest: async (params) => {
        const { url, identifier, expires } = params;
        try {
          await sendSignInVerification(url, identifier, expires);
        } catch (e) {
          throw e;
        }
      },
    }),
    Credentials({
      id: "credentials",
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const validate = loginSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });
        if (!validate.success) {
          return null;
        }
        const { email, password } = validate.data;
        const user = await getUserByCredentials(email, password);
        if (!user) return null;
        return user;
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error",
    verifyRequest: "/auth/verify/request",
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.emailVerified = user.emailVerified as Date | null;
        token.twoFactorEnabled = user.twoFactorEnabled;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.emailVerified = token.emailVerified;
        session.user.twoFactorEnabled = token.twoFactorEnabled;
      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        if (!user.emailVerified) return false;
        return true;
      }

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(Date.now()),
        },
      });
    },
  },
});
