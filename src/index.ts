import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import connectDB from "./connections/db";
import router from "./router";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors({
    credentials : true,
    origin : "http://localhost:5173"
}));

require('dotenv').config()

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

connectDB();
const db = mongoose.connection;

app.use("/", router);
app.use(errorHandler);

db.once("open", ()=>{
    console.log("MongoDB connection established!")
    app.listen(3003, ()=>{
        console.log("server listening on port 3003✅✅");
    });
});
