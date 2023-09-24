import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/custom-error.model";
import { LynkModel } from "../models/lynk";
import { UserModel } from "../models/user";
import { shortUrlGenerator } from "../utils/shortUrl";
import { validateEmail} from "../utils/validator";

const lynkController = {
    create : async (req : Request, res : Response, next : NextFunction) =>{
        const {email, _id, name} = req.user;
        console.log(req.body)
        const {link} = req.body;
        try{
            if(!email || !_id || !validateEmail(email)){
                throw new CustomError("Invalid Credentials, Login Again", 401, "Validation Error",{});
            }
            const user = await (await UserModel.findById(_id, {authentication : false}))?.toJSON();
            if(!user){
                throw new CustomError(`User does not exist`,403,'Credential Error');
            }
            const shortLynk = await shortUrlGenerator(7);
            const lynk = new LynkModel({
                userId : user._id, 
                shortLynk,
                originalLynk : link,
            });
            const savedLynk = await lynk.save();
            if(!savedLynk){
                throw new CustomError("Lynk not created", 500, 'Database Error');
            }
            return res.status(201).json({"message" :"Lynk Created Successfully", data : lynk.shortLynk});
        }catch(error){
            next(error);
        }
    },
    getUserLinks : async (req : Request, res : Response, next : NextFunction) =>{
        const {email, _id, name} = req.user;
        try{
            if(!email || !_id || !validateEmail(email)){
                throw new CustomError("Invalid Credentials, Login Again", 401, "Validation Error",{});
            }
            const user = await (await UserModel.findById(_id, {authentication : false})).toJSON();
            if(!user){
                throw new CustomError(`User does not exist`,403,'Credential Error');
            }
            const lynks = await LynkModel.find({
                userId : _id
            });
            console.log(lynks);
            res.status(200).json({
                message : "Lynks Found",
                data: lynks
            })
        }catch(error){
            next(error);
        }
    }
}

export default lynkController;