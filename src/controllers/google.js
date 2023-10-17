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
exports.getLocationGoogle = void 0;
function getLocationGoogle(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, URI, request, response, formattedResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = req.body.query;
                    URI = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=".concat(encodeURIComponent(query), "&types=(cities)&key=").concat(process.env.GOOGLE_PLACES_API_KEY);
                    return [4 /*yield*/, fetch(URI, {
                            'method': 'GET',
                        })];
                case 1:
                    request = _a.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    response = _a.sent();
                    if (response.predictions.length > 0) {
                        formattedResults = response.predictions.map(function (results) {
                            var _a;
                            return ({
                                location: results === null || results === void 0 ? void 0 : results.description,
                                city: results === null || results === void 0 ? void 0 : results.structured_formatting.main_text,
                                stateID: results === null || results === void 0 ? void 0 : results.terms[1].value,
                                countryCode: (_a = results === null || results === void 0 ? void 0 : results.terms[2]) === null || _a === void 0 ? void 0 : _a.value,
                            });
                        });
                        res.json({
                            success: true,
                            data: formattedResults
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            message: "No results found",
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getLocationGoogle = getLocationGoogle;
;
