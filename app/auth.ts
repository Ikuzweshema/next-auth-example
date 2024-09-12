import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id;
      return session;
    },
    
  },
});
