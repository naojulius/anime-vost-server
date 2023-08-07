"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeModel = void 0;
var mongoose_1 = require("mongoose");
var albumSchema = new mongoose_1.Schema({
// alternativeTitle: { type: String, required: true },
// originalTitle: { type: String, required: true },
// origin: { type: String, required: true },
// rating: { type: Number, required: true },
// trending: {type: Boolean, required: false},
// category: {type: String, required: true},
// trailer: {type: Schema.Types.ObjectId, ref: 'Trailer', required: false},
});
exports.AnimeModel = (0, mongoose_1.model)('Album', albumSchema);
// export const getTrending = () => AnimeModel.find({trending: true}).limit(2);
// export const getAnimeTable = (resultsPerPage: number, page: number) => AnimeModel.find().limit(resultsPerPage).skip(resultsPerPage * page);
// export const getTotalRowsNumber = () => AnimeModel.count();
// export const getAllAnime = () => AnimeModel.find();
// export const getAnimeById = (id: string) => AnimeModel.findById(id).populate("trailer");
// export const createAnime = (values: Record<string, any>) => new AnimeModel(values).save().then((anime)=> anime.toObject());
// export const deleteAnimeById = (id: string) => AnimeModel.findOneAndDelete({_id: id});
// export const updateAnimeById = (id: string, values: Record<string, any>)=> AnimeModel.findByIdAndUpdate(id, values);
