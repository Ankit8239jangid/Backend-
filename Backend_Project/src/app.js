import express from 'express'
import cores from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cores({
    origin: process.env.CORS_URL

}))


app.use(express.json({ limit: "20kb " })) // To get Data in the json Formate

app.use(express.urlencoded({ extends: true, limit: "20kb" })) // TO undestude the Url requste

app.use(express.static("public")) 

app.use(cookieParser())

export { app }