
import dotenv from "dotenv"
import connect_DB from "./db/index.js";

dotenv.config ({
    path: "./env"
}) 

connect_DB()



//...............................Hear's the Deffrent Aproce....................................

// import mongoose from "mongoose";
// import { DB_NAME } from './constants'

// import express from 'express'
// const app = express()

//     (async () => {

//         try {
//             await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)


//             app.on("error", (error) => {
//                 console.log("error", error)
//                 throw error
//             })

//             app.listen(process.env.PORT, () => {
//                 console.log(`app is listing on ${process.env.PORT}`)
//             })

//         }
//         catch (error) {
//             console.error("ERROR:", error)
//             throw err

//         }
//     })()