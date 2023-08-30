import {Request, Response} from "express";
import { userModel } from "../models/user";
import {  UserInterface } from '../types/user';
import { validateEmail } from "../utils/validator";
import { maskPassword, random } from '../utils/authentication';
const userController = {
    getByEmail : async (req : Request & {user : any} ,res : Response )=>{
        try {
            const { email } = req.user;
            
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
            const user : Array<UserInterface> = await userModel.find({email},{authentication : false});
            if(!user){
                return res.status(404).json({
                    message : "User with email not found"
                });
            }
            return res.status(200).json({
                message : "User found",
                user
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