import mongoose, { Model, Mongoose, Schema } from "mongoose";

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
        },
        salt : {
            type : String,
        },
        sessionToken : {
            type : String,
        },
        // this defines that while returning the response, password is not returned
    },
});

export const userModel = mongoose.model("User", userSchema);