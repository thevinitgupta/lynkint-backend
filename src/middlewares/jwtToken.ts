import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from 'express';
import { IUser } from "../types/express";
import { CustomError } from "../models/custom-error.model";

const jwtAuthHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers['authorization'];
        console.log("\n\n",authHeader, "\n\n")
        if(!authHeader) {
            throw new CustomError(
                "Access Token Not found",
                401,
                "Credential Error",
                {}
              );
        }

        const accessToken = authHeader.split(' ')[1];
        // const refreshToken = req.cookies["lynkit-token"];
        console.log("authHandler cookie Token", accessToken)
        const secret = process.env.JWT_PRIVATE_KEY;
        // console.log("jwt secret", secret);
        const user = await jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY, { algorithms: ['HS256'] });
        if (!user) {
            throw new CustomError(
                "User Forbidden",
                403,
                "Credential Error",
                {}
              );
        }
        req.user = user as IUser;
        console.log("METHOD : ", req.method, ", url : ", req.url);
        next();
    } catch (error) {
        next(error)
    }
}

export default jwtAuthHandler;