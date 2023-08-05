"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importStar(require("express"));
var secrets_1 = __importDefault(require("./secrets"));
var auth_1 = __importDefault(require("./v1/auth"));
var app = express_1["default"]();
var v1 = express_1["default"].Router();
app.use('/v1', v1);
v1.use('/auth', auth_1["default"]);
app.use(function (err, request, res) {
    express_1.response.status(500).json({ message: err });
});
app.listen(secrets_1["default"].port, function () {
    console.log("port is running on " + secrets_1["default"].port);
});
