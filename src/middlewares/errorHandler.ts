import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/custom-error.model";

const errorHandler = (error : any, req : Request, res : Response, next : NextFunction) => {
    console.log(error);
    if(error instanceof CustomError)
    {
        res.status(error.status).json({
            statusCode : error.status,
            error : error.message,
            type : error.type
        });
    }
    else {
        res.status(500).json(
        {
            statusCode : 500,
            error : error.message,
            type : 'Unknown Error'
        }
        )
    }
    next();
}

export default errorHandler;