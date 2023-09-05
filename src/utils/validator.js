"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateEmail = void 0;
var validateEmail = function (email) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
var validatePassword = function (password) {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@!*])(?=.*\d)[A-Za-z@!*0-9]{8,}$/;
    return passwordRegex.test(password);
};
exports.validatePassword = validatePassword;
