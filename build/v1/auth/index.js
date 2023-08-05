"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var authRoutes_1 = require("./authRoutes");
var authRouter = express_1["default"].Router();
authRoutes_1.authRoutes.forEach(function (route) {
    var path = route.path, middleware = route.middleware, method = route.method, handler = route.handler;
    authRouter[method](path, middleware, function (req, res, next) {
        var result = handler(req, res);
        try {
            if (result instanceof Promise) {
                result.then(function (val) {
                    (val !== null && val !== undefined) && res.status(200).json({ data: val });
                });
            }
        }
        catch (err) {
            next(err);
        }
    });
});
exports["default"] = authRouter;
