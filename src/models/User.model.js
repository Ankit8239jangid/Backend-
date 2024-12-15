import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
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
            lowercase: true,
            trim: true,
            index: true

        },

        avatar: {
            type: String, //cloudinery url
            required: true,

        },

        coverImage: {
            type: String, //cloudinery url
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true, "Password is Required"]
        },

        refreshToken: {
            type: String,

        },

    },

    { timestamps: true })


//middleware of hashing the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next() //if the password is not modified then return next
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


//method to compare the password && return true if it is correct
userSchema.methods.isPasswordCouerct = async function (password) {
    return await bcrypt.compare(password, this.password) //compare the password with the hashed password
}

//method to generate the access token
userSchema.methods.genrateAccsesToken = async function () {
    return await jwt.sign( //sign the payload with the secret key of access token
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}

//method to generate the refresh token
userSchema.methods.genraterefreshToken = async function () {
    return await jwt.sign( //sign the payload with the secret key of refresh token
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}

export const User = mongoose.model("User", userSchema)

