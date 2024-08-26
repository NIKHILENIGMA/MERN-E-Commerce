import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import HTTP_STATUS from "../utils/http_status.js";
import jwt from "jsonwebtoken";
/**
 * @description Asynchronously generates access and refresh tokens for a user.
 * @returns {Object} An object containing the access and refresh tokens.
 */
const generateAccessRefreshToken = async (userId) => {
    try {
      const customer = await Customer.findById(userId);
      const accessToken = await customer.generateAccessToken();
      const refreshToken = await customer.generateRefreshToken();
  
      if (!refreshToken) {
        throw new ApiError(400, "Refresh Token is not generation made fails !!");
      }
  
      customer.refreshToken = refreshToken;
  
      await customer.save({
        validateBeforeSave: false,
      });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "Error occur while generating access and refresh token"
      );
    }
  };
  

/**
 * Login a user with (username or email) and password, also validate password. Generators access and refresh token
 *
 * @description Logs in a user with the provided username or email and password. Generates access and refresh tokens for the user.
 * @route /api/v1/authentication/login
 * @method POST
 */


export const loginUser = asyncHandler(async (req, res) => {
    // Check if username or email is provided
    const { username, email, password } = req.body;
    
    // If provide username or email is empty or not valid, throw an error
    if (!(username || email)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Username or email is required for login");
    }
  
    // Check if username or email exists in the database
    const customer = await Customer.findOne({
      $or: [{ email }, { username }],
    });
  
    
    // If username or email does not exist, throw an error
    if (!customer) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Authentication is required. User does not exist");
    }
  
    const isPasswordValid = await customer.isPasswordCorrect(password);
    
  
    if (!isPasswordValid) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "The password which you have entered does not match, please the correct password"
      );
    }
  
    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      customer._id
    );
  
    const loggedInUser = await Customer.findById(customer._id).select(
      "-password -refreshToken"
    );
    
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(HTTP_STATUS.OK)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          {
            customer: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User Login Successfully"
        )
      );
  });
  
  /**
   *
   * @description Logs out a user by updating the user's refresh token in the database to undefined and clearing the access and refresh tokens in the cookies.
   * @route /api/v1/authentication/logout
   * @method POST
   */
  export const logoutUser = asyncHandler(async (req, res) => {
    // Find the user by ID and update the refresh token to undefined
    await Customer.findByIdAndUpdate(
      req.customer._id,
      {
        $unset: {
          refreshToken: 1, // this removes the field from document
        },
      },
      {
        new: true,
      }
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(HTTP_STATUS.OK)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(HTTP_STATUS.OK, {}, "User logged Out"));
  });
  
  /**
   * @description Refreshes the user's access token using the refresh token provided in the cookies or body.
   * @route /api/v1/authentication/refresh-token
   * @method POST
   */
  
  export const refreshAccessToken = asyncHandler(async (req, res) => {
    // Check if incoming refresh token is provided in the cookies or body
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;
  
    // If incoming refresh token is not provided, throw an error
    if (!incomingRefreshToken) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized Request, Refresh Token is required");
    }
  
    try {
      // Check if the incoming token is same as the refresh token store in the database with verify method from jsonwebtoken
  
      const decodeToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
  
      // Check if the decoded token is failed
      if (!decodeToken) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Decoding Method Failed");
      }
  
      // If we get the decoded token successfully then we can get user ID from the decoded token and find the user in the database
      const customer = await Customer.findById(decodeToken?._id);
  
      // if customer data is not found, throw an error
      if (!customer) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Customer which you are looking for is not found or does not exist");
      }
  
      // if the incoming refresh token is not same as the refresh token stored in the database, throw an error
      if (incomingRefreshToken !== customer?.refreshToken) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token is expired or used");
      }
  
      // Options for cookie
      const options = {
        httpOnly: true,
        secure: true,
      };
  
      // Generate new access token generated and new refresh token, also new refresh token is saved in the database with the help of generateAccessRefreshToken function
      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessRefreshToken(customer?._id);
  
      // return the new access token and new refresh token in the response
      return res
        .status(HTTP_STATUS.OK)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
          new ApiResponse(
            (HTTP_STATUS.OK),
            {
              accessToken,
              refreshToken: newRefreshToken,
            },
            "Access token refreshed"
          )
        );
    } catch (error) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token. Please login again.");
    }
  });