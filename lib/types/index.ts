import { z } from "zod";

type Status = "success" | "error";
export type AuthStatus = {
  status: Status;
  message: string;
};
export const userSchema = z.object({
  email: z.string().email({
    message: "This has to be an email",
  }),
  name: z.string().min(3, {
    message: "Username is required",
  }),
  password: z.string().min(4, {
    message: "This password is not strong",
  }),
});

type Errors = {
  email?: string[];
  name?: string[];
  password?: string[];
};

export type RegisterState = {
  status: Status;
  message: string;
  errors?: Errors;
};
export type MailStatus = {
  status: Status;
  message: string;
};

export type verificationToken = {
  userId: string;
  id: string;
  token: string;
  expires: Date;
};

export const loginSchema = userSchema.omit({
  name: true,
});

export const passwordResetSchema = z
  .object({
    token: z.string().min(10,{
      message:"Invalid token"
    }),
    password: z.string().min(4, {
      message: "This password is not strong",
    }),
    cpassword: z.string(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password does not match",
  });
