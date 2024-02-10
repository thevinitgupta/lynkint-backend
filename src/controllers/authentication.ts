import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";
import {
  generateJWTToken,
  maskPassword,
  random,
} from "../utils/authentication";
import { validateEmail, validatePassword } from "../utils/validator";
import { CustomError, ErrorType } from "../models/custom-error.model";
import getRedisClient from "../connections/redis-client";

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
      const userExists = await UserModel.findOne({ email });
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
      const newUser = new UserModel({
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
    //extracting ip address from AddressInfo : {address, port, family}
    const ipObject = req.socket.address() as { address: string, port: number, family: string };
    const ipAddress = ipObject.address
    console.log("ip :", ipAddress);
    
    try {
      const client = await getRedisClient(next);

      if (!email || !password) {
        throw new CustomError(
          "Email/Password missing",
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
      const user = await UserModel.findOne({ email });
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
          const requestsMade = await client.incr(ipAddress)
          let ttl = -1;
          if (requestsMade === 1) {
            await client.expire(ipAddress, 60);
            ttl = 60;
          }
          else {
            ttl = await client.ttl(ipAddress);
          }
          if (requestsMade > 5) {
            throw new CustomError(
              "Too many attemps",
              503,
              "Validation Error",
              {
                ttl
              });
          }
          console.log("Requests made till now : ", requestsMade);
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

        await client.del(ipAddress);

        const payload = {
          name: userData.name,
          email: userData.email,
          _id: userData._id
        }

        const jwtSecret = process.env.JWT_PRIVATE_KEY;
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
        if (!jwtSecret || !refreshSecret) {
          throw new CustomError("Error Creating Tokens", 500, 'Token Error');
        }
        const accessToken = await generateJWTToken(payload, jwtSecret, "1h");
        const refreshToken = await generateJWTToken(payload, refreshSecret, "1d");
        console.log("access token : ", accessToken, "\nrefresh token : ", refreshToken)
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("lynkit-token", refreshToken, {
          httpOnly: true, // secure : true for https (in production)
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        });
        console.log("cookie Set");
        res.status(201).json({
          data: "Loggin Successful",
          token: accessToken
        });
      }
    } catch (error) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.user;
    try {
      if (!email) {
        throw new CustomError(
          "Email Missing",
          400,
          "Credential Error",
          {}
        );
      }
      if (!validateEmail(email)) {
        throw new CustomError("Invalid Email", 400, "Validation Error", {});
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new CustomError(
          "Email does not exist",
          400,
          "Credential Error",
          {}
        );
      } else {

        const userData = {
          ...user.toJSON(),
        };
        user.refreshToken = "";
        await user.save();
        res.status(200)
          .clearCookie("lynkit-token")
          .json({
            data: "Logout Successful",
          });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default authenticationController;
