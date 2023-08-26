import express from "express";

import authenticationController from "../controllers/authentication";

export default (router : express.Router) => {
    router.post('/auth/register', authenticationController.signup);
}