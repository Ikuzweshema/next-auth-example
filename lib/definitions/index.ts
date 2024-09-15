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
type AuthStatus = {
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
const userSchema = z.object({
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
type RegisterState = {
  status: Status;
  message: string;
  errors?: Errors;
};
/**
 * The Mail status
 * @property {AuthStatus} status The sending mail status
 * @property {string} message The sending mail status
 */
type MailStatus = {
  status: AuthStatus;
  message: string;
};
export { AuthStatus, userSchema, MailStatus, RegisterState };
