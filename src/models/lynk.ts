import mongoose, { Schema, Types } from 'mongoose';

const lynkSchema = new Schema({
    userId : {
        type : Types.ObjectId,
        required : true
    },
    shortLynk :{
        type: String ,
        required : true
    },
    shortId :{
        type: String ,
        required : true
    },
    originalLynk : {
        type:String,
        required : true
    },
    clickCount : {
        type : Number,
        default : 0, 
    }
},{
    timestamps : true
});

export const LynkModel = mongoose.model("Lynk", lynkSchema); 