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
exports.GeCookie = exports.UpdateUser = exports.DeleteUser = exports.Table = exports.GetAllUsers = exports.Login = exports.Register = void 0;
var user_1 = require("../db/user");
var helpers_1 = require("../helpers");
var data_table_1 = require("../@core/data-table");
var Register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, surname, email, password, address, birthDate, gender, existingUser, salt, user, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, surname = _a.surname, email = _a.email, password = _a.password, address = _a.address, birthDate = _a.birthDate, gender = _a.gender;
                if (!name_1 || !surname || !email || !password || !address || !birthDate || !gender) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                return [4 /*yield*/, (0, user_1.getUserByEmail)(email)];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                salt = (0, helpers_1.random)();
                return [4 /*yield*/, (0, user_1.createUser)({
                        name: name_1,
                        surname: surname,
                        email: email,
                        address: address,
                        birthDate: birthDate,
                        gender: gender,
                        authentication: {
                            salt: salt,
                            password: (0, helpers_1.authentication)(salt, password),
                        }
                    })];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, (0, helpers_1.generateJWTToken)({
                        "_id": user._id,
                        "name": user.name,
                        "surname": user.surname,
                        "roles": user.roles
                    })];
            case 3:
                token = _b.sent();
                return [2 /*return*/, res.status(200).json(token).end()];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.sendStatus(400)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.Register = Register;
var Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, expectedHash, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                return [4 /*yield*/, (0, user_1.getUserByEmail)(email).select('+authentication.salt +authentication.password')];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                if (user.disabled) {
                    return [2 /*return*/, res.sendStatus(403)];
                }
                expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
                if (user.authentication.password != expectedHash) {
                    return [2 /*return*/, res.sendStatus(403)];
                }
                return [4 /*yield*/, (0, helpers_1.generateJWTToken)({
                        "_id": user._id,
                        "name": user.name,
                        "surname": user.surname,
                        "roles": user.roles
                    })];
            case 2:
                token = _b.sent();
                // const salt = random();
                // user.authentication.sessionToken = authentication(salt, user._id.toString());
                // await user.save();
                // res.cookie("auth", user.authentication.sessionToken, {domain: 'localhost', path: '/', maxAge: 3600000, httpOnly:false }); 
                return [2 /*return*/, res.status(200).json(token).end()];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.Login = Login;
var GetAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, user_1.getUsers)()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json(users)];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.sendStatus(400)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetAllUsers = GetAllUsers;
var Table = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, resultsPerPage, users, datatableResp, _b, _c, error_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                _a = req.body, page = _a.page, resultsPerPage = _a.resultsPerPage;
                return [4 /*yield*/, (0, user_1.getUsersTable)(resultsPerPage, page)];
            case 1:
                users = _d.sent();
                _b = data_table_1.DataTableResp.bind;
                _c = [void 0, users];
                return [4 /*yield*/, (0, user_1.getTotalRowsNumber)()];
            case 2:
                datatableResp = new (_b.apply(data_table_1.DataTableResp, _c.concat([_d.sent(), users.length, (page + 1)])))();
                return [2 /*return*/, res.status(200).json(datatableResp)];
            case 3:
                error_4 = _d.sent();
                console.log(error_4);
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.Table = Table;
var DeleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedUSer, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, user_1.deleteUserById)(id)];
            case 1:
                deletedUSer = _a.sent();
                return [2 /*return*/, res.status(200).json(deletedUSer)];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.sendStatus(400)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteUser = DeleteUser;
var UpdateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, surname, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                surname = req.body.surname;
                if (!surname) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                return [4 /*yield*/, (0, user_1.getUserById)(id)];
            case 1:
                user = _a.sent();
                user.surname = surname;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200).json(user).end()];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.UpdateUser = UpdateUser;
var GeCookie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (error) {
            console.log(error);
            return [2 /*return*/, res.sendStatus(400)];
        }
        return [2 /*return*/];
    });
}); };
exports.GeCookie = GeCookie;
