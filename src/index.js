
import dotenv from "dotenv"
import connect_DB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
})

connect_DB()
    .then(() => {

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Now the server start on ${process.env.PORT}`)
        })
    })
    .catch((err) => { 
        console.log("Mongo_DB connection  Falied !!!", err)
    })




























    
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