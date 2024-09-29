import NextAuth, { DefaultSession } from "next-auth";
import { DefaultUser } from "@auth/core";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      emailVerified?: Date | null ;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    emailVerified?: Date | null ;
    id?: string;
  }
}
