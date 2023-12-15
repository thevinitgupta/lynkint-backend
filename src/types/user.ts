import { JwtPayload } from "jsonwebtoken";
import Document, { ObjectId } from "mongoose";
export interface AuthInterface {
    password : string,
    salt : string,
    sessionToken : string
}
// ! Extends Document is required to accept MongoDB documents, others it throws Error
export interface UserInterface extends Document{
    _id : ObjectId,
    email : string,
    name : string,
    authentication : AuthInterface
}