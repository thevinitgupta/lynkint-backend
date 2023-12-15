import express from "express";

import refreshTokenController from "../controllers/refreshToken";

export default (router : express.Router) => {
    router.get('/refresh', refreshTokenController.createAccessToken);
    //, jwtAuthHandler 
}