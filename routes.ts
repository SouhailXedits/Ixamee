/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ['/new-verification', '/google-after'];

/**
 * An array of routes that are used for auth
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  '/login',
  '/register',
  '/new-verification',
  '/email-verification',
  '/error',
  '/teacher-after',
  '/google-after',
  '/reset-password',
  '/new-password'
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used fro API auth purposes
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logged in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/';
