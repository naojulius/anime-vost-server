"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var path = require("path");
var google = require("googleapis");
var anime_controller_1 = require("../controllers/anime-controller");
var files_controller_1 = require("../controllers/files-controller");
var KEYFILEPATH = path.join(process.cwd(), "credential.json");
var SCOPES = ["https://www.googleapis.com/auth/drive"];
var auth = new google.Auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});
exports.default = (function (router) {
    var uploads = multer();
    router.post("/anime/search", anime_controller_1.SearchAnime);
    router.get("/anime/trends", anime_controller_1.GetTrends);
    router.post("/anime/new", uploads.array("files"), anime_controller_1.NewAnime);
    router.get("/anime/all", anime_controller_1.AllAnime);
    router.get("/anime/:id", anime_controller_1.GetAnimeById);
    router.get("/image/:type&:name", files_controller_1.GetImage);
    router.post("/anime/table", anime_controller_1.AnimeTable);
});
