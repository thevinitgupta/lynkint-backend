import crypto from "crypto";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserInterface } from "../types/user";
import { UserModel } from '../models/user';
const SECRET = "Lynkit-API-SECRET";

//randomizer function to generate salt
export const random : Function = () : string =>  crypto.randomBytes(128).toString('base64');

// masked password generator for storage
export const maskPassword = (salt : string, password : string) : string => {
    console.log(SECRET)
    return crypto.createHmac('sha256', [salt,password].join('/')).update(SECRET).digest('hex');
}

// jwt token generator
export const generateJWTToken = async (payload : object, secret : string, expiry : string) => {
    
    // console.log(jwtSecret)
    // console.log(user)
    try {
        // Please note that exp is only set if the payload is an object literal.
        const jwtToken = await jwt.sign(payload, secret, { expiresIn : expiry});
        return jwtToken;
    } catch (error) {
        if(error instanceof JsonWebTokenError ){
            throw new Error("Error Creating token");
        }
        else{
            console.log(error);
        }
        return null;
    }
}