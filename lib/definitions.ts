/**
 * Login status
 * @property {"sucess"|"error"} status login status
 * @property {string} message login message
 */
type LoginState = {
  status: "success" | "error";
  message: string;
};

export { LoginState };
