import express from "express";
import redirectController from "../controllers/redirect";


export default (router : express.Router) => {
    router.get('/t' , redirectController.to);
}