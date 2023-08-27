import {Request, Response} from "express";
import { userModel } from "../models/user";
import {  UserInterface } from '../types/user';
import { validateEmail } from "../utils/validator";
import { maskPassword, random } from '../utils/authentication';
const userController = {
    get : async (_req : Request ,res : Response )=>{
        try {
            const users : Array<UserInterface> = await userModel.find({},{authentication : false});
            
            res.status(200).json({
                users
            });
        } catch (error) {
            console.log(error)
        }
    }
};

export default userController;