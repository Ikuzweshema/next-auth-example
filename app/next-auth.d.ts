import NextAuth, { DefaultSession } from "next-auth";
import { DefaultUser } from "@auth/core";

declare module "next-auth" {
  interface User extends DefaultUser {
    emailVerified?: Date | null;
    twoFactorEnabled?: boolean;
  }

  interface Session {
    user: DefaultSession["user"] & {
      emailVerified?: Date | null;
      twoFactorEnabled?: boolean;
    };
  }

}
