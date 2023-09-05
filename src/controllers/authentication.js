"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var authentication_1 = require("../utils/authentication");
var validator_1 = require("../utils/validator");
var custom_error_model_1 = require("../models/custom-error.model");
var authenticationController = {
    signup: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, name, password, userExists, salt, hashedPassword, newUser, savedNewUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, name = _a.name, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    if (!email || !password || !name) {
                        throw new custom_error_model_1.CustomError("Email/Password/Name missing", 400, "Credential Error", {});
                    }
                    if (!(0, validator_1.validateEmail)(email)) {
                        throw new custom_error_model_1.CustomError("Invalid Email", 400, "Validation Error", {});
                    }
                    else if (!(0, validator_1.validatePassword)(password)) {
                        throw new custom_error_model_1.CustomError("Invalid password", 400, "Validation Error", {});
                    }
                    return [4 /*yield*/, user_1.UserModel.findOne({ email: email })];
                case 2:
                    userExists = _b.sent();
                    if (userExists) {
                        throw new custom_error_model_1.CustomError("Email Already Exists", 400, "Credential Error", {});
                    }
                    salt = (0, authentication_1.random)();
                    hashedPassword = (0, authentication_1.maskPassword)(salt, password);
                    newUser = new user_1.UserModel({
                        email: email,
                        name: name,
                        authentication: {
                            password: hashedPassword,
                            salt: salt,
                        },
                    });
                    return [4 /*yield*/, newUser.save()];
                case 3: return [4 /*yield*/, (_b.sent()).toJSON()];
                case 4:
                    savedNewUser = _b.sent();
                    savedNewUser["authentication"] = null;
                    return [2 /*return*/, res
                            .status(200)
                            .json({
                            message: "New User Created Successfully",
                            user: savedNewUser,
                        })
                            .end()];
                case 5:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    login: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user, salt, hashedPassword, userData, token, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    if (!email || !password) {
                        throw new custom_error_model_1.CustomError("Email/Password/Name missing", 400, "Credential Error", {});
                    }
                    if (!(0, validator_1.validateEmail)(email)) {
                        throw new custom_error_model_1.CustomError("Invalid Email", 400, "Validation Error", {});
                    }
                    else if (!(0, validator_1.validatePassword)(password)) {
                        throw new custom_error_model_1.CustomError("Invalid password", 400, "Validation Error", {});
                    }
                    return [4 /*yield*/, user_1.UserModel.findOne({ email: email })];
                case 2:
                    user = _b.sent();
                    if (!!user) return [3 /*break*/, 3];
                    throw new custom_error_model_1.CustomError("Email does not exist", 400, "Credential Error", {});
                case 3:
                    salt = user.authentication.salt;
                    return [4 /*yield*/, (0, authentication_1.maskPassword)(salt, password)];
                case 4:
                    hashedPassword = _b.sent();
                    if (hashedPassword != user.authentication.password) {
                        throw new custom_error_model_1.CustomError("Wrong Password", 400, "Credential Error", {});
                    }
                    userData = __assign({}, user.toJSON());
                    delete userData.authentication;
                    return [4 /*yield*/, (0, authentication_1.generateJWTToken)(userData)];
                case 5:
                    token = _b.sent();
                    res.cookie("lynkit-token", token, {
                        httpOnly: true,
                    });
                    console.log("cookie Set");
                    res.status(201).json({
                        message: "Loggin Successful",
                    });
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = authenticationController;
