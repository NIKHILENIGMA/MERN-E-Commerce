import { asyncHandler }  from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Customer } from "../models/customer.model.js";

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
      // console.log("verifyJWT at 22: Token value from cookies: ",req.cookies?.accessToken);
      // console.log("verifyJWT at 23: Token value from Headers: ",req.header("Authorization"));
      
      // if req.cookies?.accessToken or req.header("Authorization") exists then take out the token
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ","");
      
      // if token does not exist throw error
      if (!token) {
        throw new ApiError(401, "Unauthorized request in authentication");
      }

      // if token is not a string throw error
      if (typeof token !== 'string') {
        throw new ApiError(400, "Token must be a string")
      }
      
      // verify the access token with the secret key
      const decodedToken = jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET
      );
      
      // console.log(JSON.stringify(decodedToken));

      // Since the JWT is valid, decodedToken will contain the user ID and fetch the user details from the database
      const customer = await Customer.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      // if user does not exist throw error 
      if (!customer) {
        throw new ApiError(401, "Invalid Access token");
      }
      
      // attach the user details to the request object and call the next middleware
      req.customer = customer
      next()
      
    } catch (error) {
      // if error occurs throw error
      throw new ApiError(401, error?.message || "Invalid access token")
    } 
  });
