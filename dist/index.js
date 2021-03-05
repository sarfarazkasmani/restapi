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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var http = require("http");
var fs = require("fs");
var host = "localhost";
var port = 4000;
require("./database");
var featureSchema = require("./schema");
app.use(express_1.default.json());
// get all features
app.get("/api/features/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allFeatures, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, featureSchema.find()];
                case 1:
                    allFeatures = _a.sent();
                    res.status(200).send(allFeatures);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(400).send(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
// add feature API
app.post("/api/features/feature", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var feature, savedFeature, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    feature = new featureSchema({
                        feature_id: req.body.feature_id,
                        feature_name: req.body.feature_name,
                        feature_type: req.body.feature_type,
                        feature_description: req.body.feature_description,
                        feature_created_timestamp: req.body.feature_created_timestamp,
                        feature_version: req.body.feature_version,
                        feature_owner: req.body.feature_owner,
                        feature_data: req.body.feature_data,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, feature.save()];
                case 2:
                    savedFeature = _a.sent();
                    res.status(200).send(savedFeature);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    res.status(400).send(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
// delete feature by id API
app.delete("/api/features/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var delFeature, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, featureSchema.findByIdAndRemove({
                        _id: req.params.id,
                    })];
            case 1:
                delFeature = _a.sent();
                res.status(200).send("Feature Deleted : " + delFeature);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).send(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get feature by id API
app.get("/api/features/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var curFeature, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, featureSchema.findById(req.params.id)];
            case 1:
                curFeature = _a.sent();
                res.status(200).send(curFeature);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).send(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// middleware
app.get("/", function (req, res) {
    app.use("/static", express_1.default.static("public"));
    res.send("http get middleware in action");
});
app.listen(7000, function () {
    console.log("server is listening port 7000");
});
