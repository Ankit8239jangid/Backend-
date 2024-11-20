import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

//configuration of cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const uplode_on_cloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",

        })
        //file has been uploaded successfully
        console.log("file has been uploaded successfully", response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("error in uploading file", error) //remove the locally saved temporary file as the upload operation is failed
        return null
    }

}

export default uplode_on_cloudinary

