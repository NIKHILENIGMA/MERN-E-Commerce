import dotenv from "dotenv";
import connnectDb from "../src/db/db.js"


dotenv.config({
    path:'./env'
})

connnectDb()