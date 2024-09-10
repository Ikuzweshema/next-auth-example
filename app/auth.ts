import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUser } from "@/lib/actions";
export const { signOut, signIn, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

    }),
  ],
});
