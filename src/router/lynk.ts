import express from "express";

import lynkController from "../controllers/lynk";
import jwtAuthHandler from "../middlewares/jwtToken";

export default (router : express.Router) => {
    router.post('/lynk/create', jwtAuthHandler ,lynkController.create);
    router.get('/lynk', jwtAuthHandler ,lynkController.getUserLinks);
}