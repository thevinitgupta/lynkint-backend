import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction, Request } from 'express';
import { IUser } from "types/express";

const jwtAuthHandler = async (req : Request, res : Response, next : NextFunction) => {
    const token = req.cookies["lynkit-token"];
    console.log("authHandler cookie Token",token)
    const secret =  process.env.JWT_PRIVATE_KEY;
    console.log("jwt secret", secret);
    try {
        const user = await jwt.verify(token, process.env.JWT_PRIVATE_KEY, { algorithms: ['HS256'] });
        if(!user){
            return res.status(400).json({
                message : "Invalid Credentials"
            });
        }
        req.user = user as IUser;
        console.log("METHOD : ", req.method, ", url : ", req.url);
        next();
    } catch (error) {
        console.log(error);
        res.clearCookie("lynkit-token");
        return res.status(500).json({
            message : "Please login again"
        });;
    }
}

export default jwtAuthHandler;