import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { findUserByCredentials } from "@/lib/actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/db";
import Github from "next-auth/providers/github";
export const { signOut, signIn, auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: "credentials",
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await findUserByCredentials(email, password);
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
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id;
      session.user.emailVerified = token.emailVerified;
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        if (!user.emailVerified) return false;
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
