"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var favourite_controller_1 = require("../controllers/favourite-controller");
exports.default = (function (router) {
    router.post("/favourite/new", favourite_controller_1.NewFavourite);
    router.get("/favourite/:owner", favourite_controller_1.getFavourite);
    router.post("/favourite/remove", favourite_controller_1.removeFavourite);
});
