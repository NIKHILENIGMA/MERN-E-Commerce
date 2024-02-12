import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
{
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, //? When index set to true this will help for searching field optimization
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,

    },
    refreshToken:{
        type: String,
    },
}, 
{
    timestamps: true
});

/**
 * Middleware function for the 'save' method on the userSchema.
 * If the password field is not modified, it proceeds to the next middleware.
 * If the password field is modified, it hashes the password before saving.
 *
 * @param {function} next - The next middleware function to be called.
 * @returns {function} - Calls the next middleware function.
 */
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

/**
 * Asynchronously compares the provided password with the user's password.
 *
 * @param {string} password - The password to compare.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

/**
 * Asynchronously generates an access token for a user.
 *
 * @async
 * @method
 * @returns {Promise<string>} A promise that resolves to a JWT access token.
 * The token includes the user's ID, email, and username, and is signed with
 * the secret key stored in `process.env.ACCESS_TOKEN_SECRET`. The token's
 * expiry time is set to the value of `process.env.ACCESS_TOKEN_EXPIRY`.
 */
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

/**
 * Asynchronously generates a refresh token for a user
 * 
 * @async 
 * @method
 * @returns {Promise<string>} A promise that resolves to a JWT refresh token
 * The token includes the user's ID and is signed with secret key stored in 'process.env.REFRESH_TOKEN_SECRET'. The token's expiry time is set to the value of  'process.env.REFRESH_TOKEN_EXPIRY'
 */
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model('User', userSchema)

