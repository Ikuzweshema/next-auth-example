/**
 * The Route which are accessible to un authenticated users
 * They are public Routes
 * such as the home page
 * @type{string[]}
 */

const publicRoutes = ["/"];
/**
 * The Route which are Used In authentication
 * They are public Authentication Routes
 * For login and registration forms
 * @type{string[]}
 */

const authRoutes = ["/auth/login", "/auth/register","/auth/error"];
/**
 * The Route which are Responsible for authentication.
 * They are Api Routes
 * such as /api/auth/signin
 * @type{string}
 */

const apiPrefix = "/api/auth";

/**
 * The Route which For authenticated Users.
 * The default redirect url when there is no callback Url .
 * The dashboard page
 * @type{string}
 */
const DEFAULT_REDIRECT_URL = "/dashboard";

export { DEFAULT_REDIRECT_URL, apiPrefix, authRoutes, publicRoutes };
