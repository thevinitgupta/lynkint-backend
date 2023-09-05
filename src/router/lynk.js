"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lynk_1 = require("../controllers/lynk");
var jwtToken_1 = require("../middlewares/jwtToken");
exports.default = (function (router) {
    router.get('/user', jwtToken_1.default, lynk_1.default.getUserLinks);
});
