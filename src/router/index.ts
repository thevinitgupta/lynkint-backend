import express from 'express';
import authentication from './authentication';
import user from './user';

const router = express.Router();


authentication(router);
user(router);
export default  router;