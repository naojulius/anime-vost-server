"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var episode_controller_1 = require("../controllers/episode-controller");
exports.default = (function (router) {
    // const storage = multer.diskStorage({
    //     destination: function(req, file, callback){
    //         callback(null, "./uploads/episodes")
    //     },
    //     filename: function(req, file, callback){
    //         callback(null, guid(file.originalname).replace(/-/g, "") + path.extname(file.originalname))
    //     },
    // });
    var uploads = multer();
    router.post("/episode/new", uploads.array("files"), episode_controller_1.NewEpisode);
    router.get("/season/:season&:owner", episode_controller_1.GetSeason);
});
