import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Asynchronously generates access and refresh tokens for a user.
 *
 * @async
 * @param {string} userId - The ID of the user for whom to generate tokens.
 * @returns {Promise<Object>} A promise that resolves to an object containing the access and refresh tokens.
 * @throws {ApiError} Throws an ApiError if there is an error during token generation.
 */
const generateAccessRefreshToken = async(userId)=> {
    try {
       const user = await User.findById(userId)
       const accessToken = user.generateAccessToken()
       const refreshToken = user.generateRefreshToken()

       user.refreshToken = refreshToken
       await user.save({
        validateBeforeSave: false,
       })

       return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Error occur while generating access and refresh token")
    }
}

/**
 * @async
 * @function registerUser
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.fullname - The full name of the user.
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns a response object with a status of 201 and a message indicating successful user registration.
 * @throws {ApiError} - Throws an error if any of the fields are empty or if the username or email already exists or if there is an issue while registering the user details.
 */
const registerUser = asyncHandler(async(req,res) => {
    const { fullName, username, email, password } = req.body;

    if (
        [fullName, username, password, email].some((field)=> field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if (existedUser) {
        throw new ApiError(400, "Username or Email already exist")
    } 

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
    });

    const createUser = await User.findOne(user._id).select(
        "-password -refreshToken"
    )
    if (!createUser) {
        throw new ApiError(500, "Issue occur while registering a user details")
    }

    return res.status(201).json(
        new ApiResponse(
            200, 
            createUser,
            "User Registed Successfully"
            )
    )

});

/**
 * *Login a user with (username or email) and password, also validate password. Generators access and refresh token 
 * 
 * @async
 * @function loginUser
 * @description This function handles user login. It checks if the username or email exists in the database, validates the password, generates access and refresh tokens, and sends them back to the client as cookies.
 * @param {Object} req - Express request object, containing user credentials in the body.
 * @param {Object} res - Express response object.
 * @throws {ApiError} Throws an ApiError if username or email is not provided, user does not exist, or password is incorrect.
 * @returns {Object} Returns a response object with status 200, access and refresh tokens as cookies, and a JSON object containing user details and tokens.
 */
const loginUser = asyncHandler(async(req,res) => {
    const {username, email, password} = req.body;

    if (!(username || email)) {
        throw new ApiError (400, "Username or email is required for login")
    }

    const user = await User.findOne({
        $or: [{email}, {username}],
    })

    if (!user) {
        throw new ApiError(404, "Authentication is required. User does not exist")
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if (!isPasswordValid) {
        throw new ApiError(401, "please entire a valid password")
    }

    const {accessToken, refreshToken} = await generateAccessRefreshToken(user._id)

    const loggedInUser =await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User Login Successfully"
        )
    )
})

/**
 * Logs out a user by updating the user's refresh token in the database to undefined and clearing the access and refresh tokens in the cookies.
 * 
 * @function
 * @async
 * @param {Object} req - Express request object, containing the user's ID in req.user._id.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object with status 200, cleared cookies, and a JSON response indicating successful logout.
 * @throws {Error} If an error occurs during the process, it will be caught and handled by the asyncHandler middleware.
 */
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

/**
 *Cookie Clearing: The .clearCookie("accessToken", accessToken, options) method call seems incorrect because clearCookie usually requires only the name of the cookie to clear it, not the value or additional options related to the cookie value. 
 *If accessToken is meant to be a variable holding the token, it shouldn't be used here. The correct usage to clear a cookie would be just .clearCookie("accessToken", options).
 */


export { 
    registerUser,
    loginUser,
    logoutUser 

};
