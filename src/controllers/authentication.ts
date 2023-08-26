
import {Request, Response} from 'express';
import { userModel } from '../models/user';
import { maskPassword, random } from '../utils/authentication';
import { validateEmail } from '../utils/validator';
const authenticationController = {
    signup : async (req : Request, res : Response) => {
        const { email , name, password } = req.body;
        if(!email || !password || !name) {
            return res.status(400).json({
                message : 'Email or Password missing'
            });
        }
        if(!validateEmail(email)){
            return res.status(400).json({
                message : 'Invalid Email'
            });
        }
        //check for existing account with the same email address
        try {
            const userExists = await userModel.findOne({email});
            if(userExists){
                return res.status(400).json({
                    message : 'Email already exists'
                });
            }
            const salt = random();
            const hashedPassword = maskPassword(salt, password);
            const newUser = new userModel({
                email,
                name,
                authentication : {
                    password : hashedPassword,
                    salt
                }
            });
            const savedNewUser = await newUser.save();
            return res.status(200).json({
                message : "New User Created Successfully",
                user : savedNewUser
            }).end();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message : error.message
            });
        }
    },
    login : (req : Request, res : Response) =>{

    }
}

export default authenticationController;