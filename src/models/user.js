"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        sessionToken: {
            type: String,
        },
        // this defines that while returning the response, password is not returned
    },
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
