import Document from "mongoose";
export interface AuthInterface {
    password : string,
    salt : string,
    sessionToken : string
}
// ! Extends Document is required to accept MongoDB documents, others it throws Error
export interface UserInterface extends Document{
    email : string,
    name : string,
    authentication : AuthInterface
}