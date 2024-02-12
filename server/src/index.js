import dotenv from "dotenv";
import connnectDb from "../src/db/db.js"
import { app } from "./app.js";


dotenv.config({
    path:'./.env'
})

const port = process.env.PORT || 5000;
connnectDb()
.then(()=>{
    app.listen(port,()=> {
        console.log(`Server is running at port: ${port}`);
    })
})
.catch((err)=> {
    console.log("Mongo db connection is failed :: Error: ", err);
})