"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var connectDB = function () {
    mongoose_1.default.connect("mongodb+srv://".concat(process.env.MONGODB_USERNAME, ":").concat(process.env.MONGODB_PASSWORD, "@lynkit.9z5gfyq.mongodb.net/?retryWrites=true&w=majority"));
    var db = mongoose_1.default.connection;
    db.on("error", function (error) {
        console.error("Error while connecting to mongoose ❌\n", error);
    });
};
exports.default = connectDB;
