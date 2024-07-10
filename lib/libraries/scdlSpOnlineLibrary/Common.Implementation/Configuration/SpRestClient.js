var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var SpRestClient = /** @class */ (function () {
    function SpRestClient(currWeb) {
        this.currWeb = currWeb;
        if (!('fetch' in window))
            throw new Error("Browser does not support fetch");
    }
    SpRestClient.prototype.CreateListItemInFolder = function (listTitle, folderPath, props) {
        return __awaiter(this, void 0, void 0, function () {
            var digest, itemProps, folderResponse, folderJson, resId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.GetDigest()];
                    case 1:
                        digest = _a.sent();
                        itemProps = [];
                        Object.keys(props).forEach(function (v, i, a) {
                            itemProps.push({ FieldName: v, FieldValue: props[v] });
                        });
                        return [4 /*yield*/, fetch(this.currWeb + "/_api/web/Lists/GetByTitle('" + listTitle + "')/AddValidateUpdateItemUsingPath", {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json;odata=verbose',
                                    'Content-type': 'application/json;odata=verbose',
                                    'odata-version': '',
                                    'X-RequestDigest': "" + digest
                                },
                                body: JSON.stringify({
                                    "listItemCreateInfo": {
                                        "FolderPath": { "DecodedUrl": "" + folderPath },
                                        "UnderlyingObjectType": 0
                                    },
                                    "formValues": itemProps,
                                    "bNewDocumentUpdate": false
                                })
                            })];
                    case 2:
                        folderResponse = _a.sent();
                        if (folderResponse.status !== 200)
                            throw new Error(folderResponse.statusText);
                        return [4 /*yield*/, folderResponse.json()];
                    case 3:
                        folderJson = _a.sent();
                        resId = folderJson.d.AddValidateUpdateItemUsingPath.results.filter(function (r) { return r.FieldName === "Id"; });
                        if (!resId || resId.length === 0)
                            throw new Error("Id of resulted object was not found");
                        return [2 /*return*/, parseInt(resId[0].FieldValue)];
                }
            });
        });
    };
    SpRestClient.prototype.GetListItemEntityType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var etRes, etJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.currWeb + "/_api/web/Lists/GetByTitle('Test')?$select=ListItemEntityTypeFullName", {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json;odata=verbose'
                            }
                        })];
                    case 1:
                        etRes = _a.sent();
                        return [4 /*yield*/, etRes.json()];
                    case 2:
                        etJson = _a.sent();
                        return [2 /*return*/, etJson.ListItemEntityTypeFullName];
                }
            });
        });
    };
    SpRestClient.prototype.GetDigest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var digestJson, digestResponse, digest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.currWeb + "/_api/contextinfo", {
                            method: 'POST',
                            headers: {
                                accept: 'application/json;odata=nometadata'
                            }
                        })];
                    case 1:
                        digestJson = _a.sent();
                        return [4 /*yield*/, digestJson.json()];
                    case 2:
                        digestResponse = _a.sent();
                        digest = digestResponse.FormDigestValue;
                        return [2 /*return*/, digest];
                }
            });
        });
    };
    return SpRestClient;
}());
export { SpRestClient };
//# sourceMappingURL=SpRestClient.js.map