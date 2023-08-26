import crypto from "crypto";
const SECRET = process.env.ENCRYPTION_SECRET;
//randomizer function to generate salt
export const random : Function = () : string => crypto.randomBytes(128).toString('base64');

// masked password generator for storage
export const maskPassword = (salt : string, password : string) : string => {
    return crypto.createHmac('sha256', [salt,password].join('/')).update(SECRET).digest('hex');
}