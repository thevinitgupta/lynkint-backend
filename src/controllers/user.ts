import {Request, Response} from "express";
import { userModel } from "../models/user";
import { Model, Mongoose } from "mongoose";
import { AuthInterface, UserInterface } from '../types/user';
const userController = {
    get : async (_req : Request ,res : Response )=>{
        try {
            const users : Array<UserInterface> = await userModel.find();
            
            res.status(200).json({
                users
            });
        } catch (error) {
            console.log(error)
        }
    },
    post : (req : Request, res : Response) => {

    }
};

export default userController;