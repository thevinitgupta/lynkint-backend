import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@lynkit.9z5gfyq.mongodb.net/?retryWrites=true&w=majority`)
    const db =mongoose.connection;

    db.on("error", (error)=>{
        console.error("Error while connecting to mongoose ❌\n", error);
    });
    
}

export default connectDB;