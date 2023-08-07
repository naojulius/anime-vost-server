"use strict";
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
exports.SearchAnime = exports.GetTrends = exports.GetTrending = exports.GetAnimeById = exports.AnimeTable = exports.AllAnime = exports.NewAnime = void 0;
var path = require("path");
var google = require("googleapis");
var anime_1 = require("../db/anime");
var environment_1 = require("../environments/environment");
var helpers_1 = require("../helpers");
var data_table_1 = require("../@core/data-table");
var KEYFILEPATH = path.join(process.cwd(), environment_1.environment.drive_credential);
var SCOPES = environment_1.environment.drive_scope;
var auth = new google.Auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});
var NewAnime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, synopsys, rating, cover, trending, category, trailer, result, anime, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, title = _a.title, synopsys = _a.synopsys, rating = _a.rating, cover = _a.cover, trending = _a.trending, category = _a.category, trailer = _a.trailer;
                if (!title || !synopsys || !rating || !category) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                return [4 /*yield*/, (0, helpers_1.driveUpload)(req.files[0], environment_1.environment.covers_path)];
            case 1:
                result = _b.sent();
                if (!result["id"]) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                cover = result['id'];
                return [4 /*yield*/, (0, anime_1.createAnime)({
                        cover: cover,
                        rating: rating,
                        synopsys: synopsys,
                        title: title,
                        category: category,
                        trending: trending,
                        trailer: trailer,
                    })];
            case 2:
                anime = _b.sent();
                return [2 /*return*/, res.status(200).json(anime).end()];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.NewAnime = NewAnime;
var AllAnime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var anime, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, anime_1.getAllAnime)()];
            case 1:
                anime = _a.sent();
                return [2 /*return*/, res.status(200).json(anime).end()];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.sendStatus(400)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.AllAnime = AllAnime;
var AnimeTable = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, resultsPerPage, users, datatableResp, _b, _c, error_3;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                _a = req.body, page = _a.page, resultsPerPage = _a.resultsPerPage;
                return [4 /*yield*/, (0, anime_1.getAnimeTable)(resultsPerPage, page)];
            case 1:
                users = _d.sent();
                _b = data_table_1.DataTableResp.bind;
                _c = [void 0, users];
                return [4 /*yield*/, (0, anime_1.getTotalRowsNumber)()];
            case 2:
                datatableResp = new (_b.apply(data_table_1.DataTableResp, _c.concat([_d.sent(), users.length, (page + 1)])))();
                return [2 /*return*/, res.status(200).json(datatableResp)];
            case 3:
                error_3 = _d.sent();
                console.log(error_3);
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.AnimeTable = AnimeTable;
var GetAnimeById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, anime, animeSeasonNumber, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, (0, anime_1.getAnimeById)(id)];
            case 1:
                anime = _a.sent();
                return [4 /*yield*/, (0, anime_1.getAnimeSeasonNumber)({ owner: anime._id })];
            case 2:
                animeSeasonNumber = _a.sent();
                anime.seasonNumber = animeSeasonNumber;
                return [2 /*return*/, res.status(200).json(anime).end()];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetAnimeById = GetAnimeById;
var GetTrending = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var anime, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, anime_1.getTrending)()];
            case 1:
                anime = _a.sent();
                return [2 /*return*/, res.status(200).json(anime).end()];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.sendStatus(400)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetTrending = GetTrending;
var GetTrends = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var anime, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, anime_1.getTrending)()];
            case 1:
                anime = _a.sent();
                return [2 /*return*/, res.status(200).json(anime).end()];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                return [2 /*return*/, res.sendStatus(400)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetTrends = GetTrends;
var SearchAnime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, anime, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                key = req.body.key;
                return [4 /*yield*/, (0, anime_1.searchAnime)(key)];
            case 1:
                anime = _a.sent();
                return [2 /*return*/, res.status(200).json(anime).end()];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [2 /*return*/, res.sendStatus(400)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.SearchAnime = SearchAnime;
