import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction, Request } from 'express';
import { IUser } from "../types/express";
import { CustomError } from "../models/custom-error.model";

const jwtAuthHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies["lynkit-token"];
        console.log("authHandler cookie Token", token)
        if(!token){
            throw new CustomError(
                "JWT Token Not found",
                404,
                "Token Error",
                {}
              );
        }
        const secret = process.env.JWT_PRIVATE_KEY;
        console.log("jwt secret", secret);
        const user = await jwt.verify(token, process.env.JWT_PRIVATE_KEY, { algorithms: ['HS256'] });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }
        req.user = user as IUser;
        console.log("METHOD : ", req.method, ", url : ", req.url);
        next();
    } catch (error) {
        next(error)
    }
}

export default jwtAuthHandler;