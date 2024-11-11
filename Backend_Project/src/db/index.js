
//..........................her's the Raight way to....................................

import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connect_DB = async () => { 

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`the mongo db is connected ${connectionInstance.connection.host}`)

    }

    catch (error) {
        console.log("MONGODB error in the db/index.js ", error)
        process.exit(1)

    }
}

export default connect_DB;
