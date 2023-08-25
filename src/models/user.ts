import mongoose, { Model, Mongoose, Schema } from "mongoose";
import {UserInterface} from "../types/user";

const userSchema : Schema = new Schema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    authentication : {
        password : {
            type : String,
            required : true,
            select : false 
        },
        salt : {
            type : String,
            select : false 
        },
        sessionToken : {
            type : String,
            select : false 
        },
        // this defines that while returning the response, password is not returned
    },
});

export const userModel = mongoose.model("User", userSchema);