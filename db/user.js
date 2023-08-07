"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalRowsNumber = exports.getUsersTable = exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUSerBySessionToken = exports.getUserByEmail = exports.getUsers = exports.User = void 0;
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({ any: [] });
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true },
    createDate: { type: Date, required: false, default: Date.now() },
    gender: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    roles: { type: [String], required: false, default: ['USER'] },
    authentication: {
        password: { type: String, required: true },
        salt: { type: String, required: false },
        sessionToken: { type: String, required: false },
    }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
var getUsers = function () { return exports.User.find().select("-authentication"); };
exports.getUsers = getUsers;
var getUserByEmail = function (email) { return exports.User.findOne({ email: email }); };
exports.getUserByEmail = getUserByEmail;
var getUSerBySessionToken = function (sessionToken) { return exports.User.findOne({
    'authentication.sessionToken': sessionToken,
}); };
exports.getUSerBySessionToken = getUSerBySessionToken;
var getUserById = function (id) { return exports.User.findById(id); };
exports.getUserById = getUserById;
var createUser = function (values) { return new exports.User(values).save().then(function (user) { return user.toObject(); }); };
exports.createUser = createUser;
var deleteUserById = function (id) { return exports.User.findOneAndDelete({ _id: id }); };
exports.deleteUserById = deleteUserById;
var updateUserById = function (id, values) { return exports.User.findByIdAndUpdate(id, values); };
exports.updateUserById = updateUserById;
var getUsersTable = function (resultsPerPage, page) { return exports.User.find().select("-authentication").limit(resultsPerPage).skip(resultsPerPage * page); };
exports.getUsersTable = getUsersTable;
var getTotalRowsNumber = function () { return exports.User.count(); };
exports.getTotalRowsNumber = getTotalRowsNumber;
