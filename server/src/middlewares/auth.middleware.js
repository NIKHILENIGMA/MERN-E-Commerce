import { asyncHandler }  from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

/**
 * Middleware function to verify JSON Web Token (JWT) and authenticate user.
 * 
 * @async
 * @function verifyJWT
 * 
 * @description - This function verifies the JSON Web Token (JWT) provided in the request. It checks if the token exists in the cookies or the Authorization header. If the token is valid, it decodes the token to get the user ID and fetches the user details from the database. The user details are then attached to the request object for further processing.
 * 
 * @param {Object} req - Express request object, expected to contain JWT in cookies or Authorization header.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {ApiError} If the JWT is not provided, invalid, or the user does not exist.
 */

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
    //   console.log("Token value",req.cookies?.accessToken);
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ","");
  
      if (!token) {
        throw new ApiError(401, "Unauthorized request in authentication");
      }

      if (typeof token !== 'string') {
        throw new ApiError(400, "Token must be a string")
      }
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
  
      if (!user) {
        throw new ApiError(401, "Invalid Access token");
      }
      //@ Custome middleware 
      req.user = user
      next()
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token")
    } 
  });
