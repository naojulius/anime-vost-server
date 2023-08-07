"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimeSeasonNumber = exports.updateAnimeById = exports.deleteAnimeById = exports.createAnime = exports.getAnimeById = exports.getAllAnime = exports.getTotalRowsNumber = exports.getAnimeTable = exports.searchAnime = exports.getTrending = exports.AnimeModel = void 0;
var mongoose_1 = require("mongoose");
var anime_episode_1 = require("./anime-episode");
var animeSchema = new mongoose_1.Schema({
    cover: { type: String, required: true },
    title: { type: String, required: true },
    synopsys: { type: String, required: true },
    rating: { type: Number, required: true },
    trending: { type: Boolean, required: false },
    category: { type: String, required: true },
    trailer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Trailer', required: false },
    seasonNumber: { type: Number, required: false },
});
exports.AnimeModel = (0, mongoose_1.model)('Anime', animeSchema);
var getTrending = function () { return exports.AnimeModel.find({ trending: true }).limit(2); };
exports.getTrending = getTrending;
var searchAnime = function (key) { return exports.AnimeModel.find({ title: { $regex: key, $options: 'i' } }); };
exports.searchAnime = searchAnime;
var getAnimeTable = function (resultsPerPage, page) { return exports.AnimeModel.find().limit(resultsPerPage).skip(resultsPerPage * page); };
exports.getAnimeTable = getAnimeTable;
var getTotalRowsNumber = function () { return exports.AnimeModel.count(); };
exports.getTotalRowsNumber = getTotalRowsNumber;
var getAllAnime = function () { return exports.AnimeModel.find(); };
exports.getAllAnime = getAllAnime;
var getAnimeById = function (id) { return exports.AnimeModel.findById(id).populate("trailer"); };
exports.getAnimeById = getAnimeById;
var createAnime = function (values) { return new exports.AnimeModel(values).save().then(function (anime) { return anime.toObject(); }); };
exports.createAnime = createAnime;
var deleteAnimeById = function (id) { return exports.AnimeModel.findOneAndDelete({ _id: id }); };
exports.deleteAnimeById = deleteAnimeById;
var updateAnimeById = function (id, values) { return exports.AnimeModel.findByIdAndUpdate(id, values); };
exports.updateAnimeById = updateAnimeById;
var getAnimeSeasonNumber = function (season) { return anime_episode_1.Episode.find(season).sort({ season: -1 }).limit(1).then(function (eps) { var _a; return (_a = eps[0]) === null || _a === void 0 ? void 0 : _a.season; }); };
exports.getAnimeSeasonNumber = getAnimeSeasonNumber;
