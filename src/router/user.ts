import express from "express";

import userController from "../controllers/user";
import jwtAuthHandler from "../middlewares/jwtToken";

export default (router : express.Router) => {
    router.get('/user',userController.getByEmail);
    //, jwtAuthHandler 
}