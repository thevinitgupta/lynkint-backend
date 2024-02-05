import express from 'express';
import authentication from './authentication';
import user from './user';
import lynk from "./lynk";
import refreshToken from './refreshToken';
import redirect from './redirect';

const router = express.Router();


authentication(router);
refreshToken(router);
user(router);
lynk(router);
redirect(router)

export default  router;