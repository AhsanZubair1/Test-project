"use strict";
exports.__esModule = true;
var authController_1 = require("./authController");
exports.authRoutes = [
    { method: 'get', path: '/register', handler: authController_1.register, middleware: [], public: true },
    { method: "post", path: "/login", middleware: [], handler: authController_1.register, public: true },
];
