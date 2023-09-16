import {Request, Response} from "express";
import { UserModel } from "../models/user";
import {  UserInterface } from '../types/user';
import { validateEmail } from "../utils/validator";
import { maskPassword, random } from '../utils/authentication';
const userController = {
    getByEmail : async (req : Request ,res : Response )=>{
        try {
            const { email } = req.user;
            // const email = "thevinitgupta@gmail.com";
            if(!email) {
                return res.status(400).json({
                    message : 'Email missing, Login Again!'
                });
            }
            if(!validateEmail(email)){
                return res.status(400).json({
                    message : 'Invalid Email'
                });
            }
            const user : Array<UserInterface> = await UserModel.find({email},{authentication : false});
            if(!user){
                return res.status(404).json({
                    message : "User with email not found"
                });
            }
            return res.status(200).json({
                message : "User found",
                user : user[0]
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message : error.message,
                user : null
            })
        }
    }
};

export default userController;