import express from "express";

import authenticationController from "../controllers/authentication";
import jwtAuthHandler from "../middlewares/jwtToken";

export default (router : express.Router) => {
    router.post('/auth/register', authenticationController.signup);
    router.post('/auth/login', authenticationController.login);
    router.post('/auth/logout', jwtAuthHandler, authenticationController.logout);
}