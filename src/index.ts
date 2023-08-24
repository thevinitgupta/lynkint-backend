import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import connectDB from "./connections/db";

const app = express();

app.use(cors({
    credentials : true
}));

configDotenv();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

connectDB();
const db = mongoose.connection;

db.once("open", ()=>{
    console.log("MongoDB connection established!")
    app.listen(3003, ()=>{
        console.log("server listening on port 3003✅✅");
    });
});
