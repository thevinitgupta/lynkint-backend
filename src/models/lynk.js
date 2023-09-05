"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LynkModel = void 0;
var mongoose_1 = require("mongoose");
var lynkSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    shortLynk: {
        type: String,
        required: true
    },
    originalLynk: {
        type: String,
        required: true
    },
    clickCount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});
exports.LynkModel = mongoose_1.default.model("Lynk", lynkSchema);
