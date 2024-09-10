import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "@/lib/actions";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/db/db";

export const { signOut, signIn, auth, handlers } = NextAuth({
  adapter:PrismaAdapter(prisma),
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
  ],
  session:{
    strategy:"jwt"
  },
  pages:{
    signIn:"/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  }
});
