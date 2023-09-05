"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../controllers/user");
var jwtToken_1 = require("../middlewares/jwtToken");
exports.default = (function (router) {
    router.get('/user', jwtToken_1.default, user_1.default.getByEmail);
});
