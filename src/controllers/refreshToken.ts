import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/custom-error.model";
import jwt from "jsonwebtoken";
import { validateEmail } from "../utils/validator";
import { UserInterface } from "../types/user";
import { UserModel } from "../models/user";
import { IUser } from "../types/express";
import { generateJWTToken } from "../utils/authentication";


const refreshTokenController = {
    createAccessToken : async (req : Request,res : Response, next : NextFunction) => {
        const cookies = req.cookies;

        try {
            if(!cookies || !cookies["lynkit-token"]) {
                throw new CustomError("Unauthorized User", 401, "Credential Error", "Refresh Token Missing")
            }
            const refreshToken = cookies["lynkit-token"];

            // find user with given refresh token
            
            
            const dbUser : Array<UserInterface> = await UserModel.find({refreshToken}, {authentication : false});

            // user with refresh token not found
            if(!dbUser){
                return res.status(403).json({
                    message : "Invalid Credentials"
                });
            }

            // decode jwt token
            const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, { algorithms: ['HS256'] });
            if (!decoded) {
                throw new CustomError(
                    "User Forbidden",
                    403,
                    "Credential Error",
                    {}
                  );
            }
            const tokenUser : IUser = decoded as IUser;
            const foundUser : IUser = {
                name : dbUser[0].name,
                email : dbUser[0].email,
                _id : dbUser[0]._id
            };

            // if not valid email, forbidden
            if(tokenUser.email!==foundUser.email) {
                console.log(tokenUser.email, foundUser.email)
                throw new CustomError("Invalid User",403, "Credential Error")
            }
            const accessToken = await generateJWTToken(
                foundUser,
                process.env.JWT_PRIVATE_KEY,
                '1h'
            );

            return res.status(201).json({
                accessToken
            });

        } catch (error) {
            next(error);
        }
    }
}

export default refreshTokenController;