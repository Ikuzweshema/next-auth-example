import { z } from "zod";

/**
 * The login Status
 * @property {string} success|error The login status
 */
type Status = "success" | "error";
/**
 * Login status
 * @property {Status} status login status
 * @property {string} message login message
 */
export type AuthStatus = {
  status: Status;
  message: string;
};
/**
 * The zod schema  of User
 *
 * @property {string} email The user's Email
 * @property {string} name  The user's Names
 * @property {string} password The user's Password
 */
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
/**
 * @property {string} email  Email input Errors
 * @property {string} name input name Errors
 * @property {string} password password input Errors
 */
type Errors = {
  email?: string[];
  name?: string[];
  password?: string[];
};

/**
 * The registration status
 * @property {Status} status the status of registration
 * @property {string} message the message of the registration
 * @property {Errors} Errors   Error Messages
 */
export type RegisterState = {
  status: Status;
  message: string;
  errors?: Errors;
};
/**
 * The Mail status
 * @property {Status} status The sending mail status
 * @property {string} message The sending mail status
 */
export type MailStatus = {
  status: Status;
  message: string;
};

/**
 * Type Verification token
 * @property {string} UserId The Verification token's userId
 * @property {string}  Id    The Vefificationtoken Id
 * @property {token}  Token   The Vefificationtoken
 * @property {Date}   Expires  The Time The token Expires
 */
export type verificationToken = {
  userId: string;
  id: string;
  token: string;
  expires: Date;
};

export const loginSchema = userSchema.omit({
  name: true,
});

export const passwordResetSchema = z.object({
  token: z.string().uuid({
    message: "Invalid token"
  }),
  password: z.string().min(4, {
    message: "This password is not strong"
  }),
  cpassword: z.string()
}).refine(data => data.password === data.cpassword, {
  message: "Password does not match"
})

