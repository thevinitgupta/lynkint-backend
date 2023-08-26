import express from "express";

import userController from "../controllers/user";

export default (router : express.Router) => {
    router.get('/user', userController.get);
}