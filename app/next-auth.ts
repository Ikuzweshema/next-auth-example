import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";
declare module "next-auth" {
  interface User {
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

declare module "next-auth/jwt" {
  interface JWT {
    twoFactorEnabled: boolean | undefined;
    emailVerified: Date | null;
  }
}
