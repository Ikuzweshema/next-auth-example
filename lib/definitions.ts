import { z } from "zod";
/**
 * Login status
 * @property {"sucess"|"error"} status login status
 * @property {string} message login message
 */
type LoginState = {
  status: "success" | "error";
  message: string;
};

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
 * @property {"sucess"|"error"} status the status of registration
 * @property {string} message the message of the registration
 * @property {Errors} Errors   Error Messages
 */
export type RegisterState = {
  status: "success" | "error";
  message: string;
  errors?: Errors;
};
export { LoginState, userSchema };
