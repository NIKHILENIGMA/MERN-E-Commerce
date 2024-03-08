import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

let corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}


/// All Middleware congfigurations 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static('public'))
app.use(cors(corsOptions))
app.use(cookieParser())


/// Api routes
import userRouters from "./routes/user.route.js"
import categoryRouters from "./routes/category.route.js"

app.use("/api/v1/users", userRouters);
app.use("/api/v1/category", categoryRouters);





export {app};