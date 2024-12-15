import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js"
import uplode_on_cloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, userName, password } = req.body
    //cheking all field is full fill or not
    if (
        [fullName, email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All Fields are required")
    }

    // cheking if the User alredy exists or not 

    const existedUser = User.findOne({

        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or Username Alredy exists")
    }

    //chek and get the avatar and cover image by multer methord
    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avtarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    //Uploding data on Cloudinary
    const avatar = await uplode_on_cloudinary(avtarLocalPath)
    const coverImage = await uplode_on_cloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    //Creating The User
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Somting went wrong while creting the User")
    }

    return req.status(201).json(
        new ApiResponse(200, createdUser, "user Registerd Successfully")
    )


})
export { registerUser }

