import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connnectDb = async ()=> {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        // console.log("Connection Instance:",connectInstance.connection);
        console.log(`MongoBD connected!! DB Host: ${connectInstance.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Failed Error: ${error.message}`);
        process.exit(1);
    }
}

export default connnectDb;