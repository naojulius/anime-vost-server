"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../controllers/user-controller");
var middlewares_1 = require("../middlewares");
exports.default = (function (router) {
    router.post("/auth/register", user_controller_1.Register);
    router.post("/auth/login", user_controller_1.Login);
    router.get("/user/all", user_controller_1.GetAllUsers);
    router.post("/user/table", user_controller_1.Table);
    router.get("/user/delete/:id", middlewares_1.isAuthenticated, middlewares_1.isOwner, user_controller_1.GetAllUsers);
    router.get("/user/update/:id", middlewares_1.isAuthenticated, middlewares_1.isOwner, user_controller_1.UpdateUser);
    router.get("/cookie", user_controller_1.GeCookie);
});
