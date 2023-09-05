"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var compression_1 = require("compression");
var cookie_parser_1 = require("cookie-parser");
var body_parser_1 = require("body-parser");
var mongoose_1 = require("mongoose");
var db_1 = require("./connections/db");
var router_1 = require("./router");
var errorHandler_1 = require("./middlewares/errorHandler");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
require('dotenv').config();
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
(0, db_1.default)();
var db = mongoose_1.default.connection;
app.use("/", router_1.default);
app.use(errorHandler_1.default);
db.once("open", function () {
    console.log("MongoDB connection established!");
    app.listen(3003, function () {
        console.log("server listening on port 3003✅✅");
    });
});
