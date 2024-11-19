import mongoose, { Schema } from "mongoose";
import  mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = Schema(
    {
        videoFile: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        titel: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
            required: true,
        },

        duration: {
            type: Number,
            required: true,
        },

        views: {
            type: Number,
            default: 0,
        },
        isPublshed: {
            type: Boolean,
            default: true,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }


    },
    { timestamps: true })

    videoSchema.Plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)