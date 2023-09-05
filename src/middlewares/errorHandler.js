"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var custom_error_model_1 = require("../models/custom-error.model");
var errorHandler = function (error, req, res, next) {
    console.log(error);
    if (error instanceof custom_error_model_1.CustomError) {
        res.status(error.status).json({
            statusCode: error.status,
            error: error.message,
            type: error.type
        });
    }
    else {
        res.status(500).json({
            statusCode: 500,
            error: error.message,
            type: 'Unknown Error'
        });
    }
    next();
};
exports.default = errorHandler;
