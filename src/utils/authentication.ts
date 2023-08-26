import crypto from "crypto";
const SECRET = "Lynkit-API-SECRET";

//randomizer function to generate salt
export const random : Function = () : string =>  crypto.randomBytes(128).toString('base64');

// masked password generator for storage
export const maskPassword = (salt : string, password : string) : string => {
    console.log(SECRET)
    return crypto.createHmac('sha256', [salt,password].join('/')).update(SECRET).digest('hex');
}