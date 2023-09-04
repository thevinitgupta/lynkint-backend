import express from 'express';
import authentication from './authentication';
import user from './user';
import lynk from "./lynk";

const router = express.Router();


authentication(router);
user(router);
lynk(router);

export default  router;