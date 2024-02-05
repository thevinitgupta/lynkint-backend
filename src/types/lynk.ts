import { Document, ObjectId } from "mongoose";

export interface LynkInterface extends Document {
    userId : ObjectId,
    shortLynk : string,
    shortId :string,
    originalLynk : string,
    clickCount : number,
}