
import {Request, Response} from 'express';
import { userModel } from '../models/user';
import { generateJWTToken, maskPassword, random } from '../utils/authentication';
import { validateEmail, validatePassword } from '../utils/validator';
import { UserInterface } from '../types/user';
const authenticationController = {
    signup : async (req : Request, res : Response) => {
        const { email , name, password } = req.body;
        if(!email || !password || !name) {
            return res.status(400).json({
                message : 'Email/Password/Name missing'
            });
        }
        if(!validateEmail(email)){
            return res.status(400).json({
                message : 'Invalid Email'
            });
        }
        else if(!validatePassword(password)){
            return res.status(400).json({
                message : 'Invalid password'
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
    login : async (req : Request, res : Response) =>{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                message : 'Email or Password missing'
            });
        }
        if(!validateEmail(email)){
            return res.status(400).json({
                message : 'Invalid Email'
            });
        }
        try {
            const user = await userModel.findOne({email});
            if(!user){
                return res.status(400).json({
                    message : 'Email does not exist'
                });
            }
            else {
                const salt = user.authentication.salt;
                const hashedPassword = maskPassword(salt, password);
                if(hashedPassword!=user.authentication.password){
                    return res.send(403).json({
                        message : "Invalid Password"
                    });
                }
                const userData = {
                    ...user.toJSON()
                };
                delete userData.authentication;
                const token = await generateJWTToken(userData);
                res.cookie("token",token, {
                    httpOnly : true
                });

                res.redirect("/user")
            }
        } catch (error) {
            
        }

    }
}

export default authenticationController;