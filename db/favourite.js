"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFavourite = exports.getFavourites = exports.newFavourite = exports.Favourite = void 0;
var mongoose_1 = require("mongoose");
var favouriteSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    anime: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Anime' }],
});
exports.Favourite = (0, mongoose_1.model)('Favourite', favouriteSchema);
var newFavourite = function (values) { return new exports.Favourite(values).save().then(function (t) { return t.toObject(); }); };
exports.newFavourite = newFavourite;
var getFavourites = function (id) { return exports.Favourite.find({ owner: id }).populate("anime").then(function (eps) { return eps[0]; }); };
exports.getFavourites = getFavourites;
var updateFavourite = function (id, anime) { return exports.Favourite.findOneAndUpdate({ owner: id }, { anime: anime }).populate("anime"); };
exports.updateFavourite = updateFavourite;
