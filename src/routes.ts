/**
 * An array of routes that are accessible to public
 * These routes do note require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/api/uploadthing"];

/**
 * An array of routes that are used for authentication
 * These routes do not require authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/signin", "/auth/register", "/auth/error"];

/**
 * Prefix for APi authentication routes
 * Routes that start with this prefix are used for APi authentication purposes
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after logging in
 * @type {string[]}
 */
export const DEFAULT_LOGIN_REDIRECT = "/posts";
