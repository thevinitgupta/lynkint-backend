import express from "express";

import lynkController from "../controllers/lynk";
import jwtAuthHandler from "../middlewares/jwtToken";

export default (router : express.Router) => {
    router.get('/user', jwtAuthHandler ,lynkController.getUserLinks);
}