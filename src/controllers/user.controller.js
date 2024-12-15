import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js"

const registerUser = asyncHandler(async (req, res) => {

    // const { fullName, email, userName, password } = req.body
    // console.log("email", email)

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

    //cheking 


})
export { registerUser }

