import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

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
  if (!req.customer) {
    throw new ApiError(
      401, 
      "User must be logged in"
    );
  };
  
  if (req.customer && !req.customer?.isAdmin) {
    throw new ApiError(
      403, 
      "Customer does not have administrative privileges"
    );
  }
  next();
});

export { isAdmin };