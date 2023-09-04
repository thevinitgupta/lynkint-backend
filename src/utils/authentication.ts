import crypto from "crypto";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserInterface } from "types/user";
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
export const generateJWTToken = async (user : object) => {
    const jwtSecret = process.env.JWT_PRIVATE_KEY;
    console.log(jwtSecret)
    console.log(user)
    try {
        const jwtToken = await jwt.sign(JSON.stringify(user), jwtSecret);
        return jwtToken;
    } catch (error) {
        if(error instanceof JsonWebTokenError ){
            throw new Error("Error Creating token");
        }
        else{
            console.log(error);
        }
    }
}