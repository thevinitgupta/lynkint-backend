import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user";
import {
  generateJWTToken,
  maskPassword,
  random,
} from "../utils/authentication";
import { validateEmail, validatePassword } from "../utils/validator";
import { CustomError, ErrorType } from "../models/custom-error.model";

const authenticationController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body;
    try {
      if (!email || !password || !name) {
        throw new CustomError(
          "Email/Password/Name missing",
          400,
          "Credential Error",
          {}
        );
      }
      if (!validateEmail(email)) {
        throw new CustomError("Invalid Email", 400, "Validation Error", {});
      } else if (!validatePassword(password)) {
        throw new CustomError("Invalid password", 400, "Validation Error", {});
      }
      //check for existing account with the same email address
      const userExists = await userModel.findOne({ email });
      if (userExists) {
        throw new CustomError(
          "Email Already Exists",
          400,
          "Credential Error",
          {}
        );
      }
      const salt = random();
      const hashedPassword = maskPassword(salt, password);
      const newUser = new userModel({
        email,
        name,
        authentication: {
          password: hashedPassword,
          salt,
        },
      });
      const savedNewUser = await (await newUser.save()).toJSON();
      savedNewUser["authentication"] = null;
      return res
        .status(200)
        .json({
          message: "New User Created Successfully",
          user: savedNewUser,
        })
        .end();
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new CustomError(
          "Email/Password/Name missing",
          400,
          "Credential Error",
          {}
        );
      }
      if (!validateEmail(email)) {
        throw new CustomError("Invalid Email", 400, "Validation Error", {});
      } else if (!validatePassword(password)) {
        throw new CustomError("Invalid password", 400, "Validation Error", {});
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new CustomError(
          "Email does not exist",
          400,
          "Credential Error",
          {}
        );
      } else {
        const salt = user.authentication.salt;
        const hashedPassword = await maskPassword(salt, password);
        if (hashedPassword != user.authentication.password) {
          throw new CustomError(
            "Wrong Password",
            400,
            "Credential Error",
            {}
          );
        }
        const userData = {
          ...user.toJSON(),
        };
        delete userData.authentication;
        const token = await generateJWTToken(userData);
        res.cookie("lynkit-token", token, {
          httpOnly: true,
        });
        console.log("cookie Set");
        res.status(201).json({
          message: "Loggin Successful",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default authenticationController;
