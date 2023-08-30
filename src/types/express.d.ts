import { ObjectId } from "mongoose";
import * as express from "express";
interface IUser {
  name: string;
  _id: ObjectId;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
