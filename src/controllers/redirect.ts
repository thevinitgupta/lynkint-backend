import { NextFunction, Request, Response } from "express";
import { LynkModel } from "../models/lynk";
import { CustomError } from "../models/custom-error.model";
import { LynkInterface } from "../types/lynk";


const redirectController = {
    to: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const id: string = req?.query?.o as string;
            const lynks : Array<LynkInterface>= await LynkModel.find({ shortId: id });
            
            if (lynks === null || lynks.length === 0) {
                throw new CustomError("Short Lynk not found", 404, "Data Missing")
            }
            else {
                const lynk = lynks[0];
                lynk.clickCount += 1;
                await lynk.save();
                res.redirect(lynk.originalLynk);
            }
        } catch (error) {
            next(error)
        }
    }
}

export default redirectController;