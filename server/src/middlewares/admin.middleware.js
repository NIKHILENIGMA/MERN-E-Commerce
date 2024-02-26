import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

/**
 * Middleware to check if the current user is an administrator.
 * Throws an error if the user is not logged in or if the user does not have admin privileges.
 * 
 * @param {Object} req - The request object from Express.js, expected to have a `user` property indicating the current user.
 * @param {Object} _ - The response object from Express.js. Not used in this middleware, hence the underscore.
 * @param {Function} next - The next middleware function in the Express.js stack.
 * @throws {ApiError} Throws a 401 error if the user is not logged in, or a 403 error if the user is not an administrator.
 */
const isAdmin = asyncHandler(async (req, _, next) => {
  if (!req.user) {
    throw new ApiError(401, "User must be logged in");
  }
  if (req.user && !req.user.isAdmin) {
    throw new ApiError(403, "User does not have administrative privileges");
  }
  next();
});

export { isAdmin };