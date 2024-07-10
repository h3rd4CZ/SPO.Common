var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { SpRepositoryBase } from './SpRepositoryBase';
import { SpRestClient } from '../../Common.Implementation/Configuration/SpRestClient';
import { GroupInfo } from '../../Common/Security/GroupInfo';
import { UserInfo } from '../../Common/Security/UserInfo';
import { SectionDesignation } from '../../Common/Security/SectionDesignation';
var EntityRepositoryBase = /** @class */ (function (_super) {
    __extends(EntityRepositoryBase, _super);
    function EntityRepositoryBase(entityType, listResolver, web) {
        var _this = _super.call(this, listResolver, web) || this;
        _this.entityType = entityType;
        return _this;
    }
    EntityRepositoryBase.prototype.Selects = function () {
        return ["Id", "Title", "Author/Id", "Author/UserName", "Author/FirstName", "Author/LastName", "Author/EMail"];
    };
    EntityRepositoryBase.prototype.Expands = function () {
        return ["Author"];
    };
    EntityRepositoryBase.prototype.createEntityType = function () {
        return new this.entityType();
    };
    EntityRepositoryBase.prototype.Create = function (entity, folder) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.UseList.call(this, function (list) { return __awaiter(_this, void 0, void 0, function () {
                            var createPayload, web, restClient, fldr, l, listTitle;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        createPayload = this.createItem(entity);
                                        if (!folder) return [3 /*break*/, 5];
                                        return [4 /*yield*/, this._web.get()];
                                    case 1:
                                        web = _a.sent();
                                        restClient = new SpRestClient(web.Url);
                                        return [4 /*yield*/, this.EnsureFolder(folder, list, restClient)];
                                    case 2:
                                        fldr = _a.sent();
                                        return [4 /*yield*/, list.select("Title").get()];
                                    case 3:
                                        l = _a.sent();
                                        listTitle = l.Title;
                                        return [4 /*yield*/, restClient.CreateListItemInFolder(listTitle, fldr.ServerRelativeUrl, createPayload)];
                                    case 4:
                                        _a.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, list.items.add(createPayload)];
                                    case 6: return [2 /*return*/, _a.sent()];
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityRepositoryBase.prototype.Update = function (entity) {
        var _this = this;
        return _super.prototype.UseList.call(this, function (list) { return __awaiter(_this, void 0, void 0, function () {
            var updatePayload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatePayload = this.createItem(entity);
                        return [4 /*yield*/, list.items.getById(entity.Id).update(updatePayload)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    };
    EntityRepositoryBase.prototype.Delete = function (id) {
        var _this = this;
        return _super.prototype.UseList.call(this, function (list) { return __awaiter(_this, void 0, void 0, function () {
            var itm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, list.items.getById(id).delete()];
                    case 1:
                        itm = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EntityRepositoryBase.prototype.ReadById = function (id) {
        var _this = this;
        var composeBuilder = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            composeBuilder[_i - 1] = arguments[_i];
        }
        return _super.prototype.UseList.call(this, function (list) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d, items, result;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        items = (_a = (_b = list.items).select.apply(_b, this.Selects())).expand.apply(_a, this.Expands());
                        if (composeBuilder && composeBuilder.length > 0) {
                            items = this.UseCompose(items, composeBuilder);
                        }
                        return [4 /*yield*/, (_c = (_d = items.getById(id)).select.apply(_d, this.Selects())).expand.apply(_c, this.Expands()).get()];
                    case 1:
                        result = _e.sent();
                        return [2 /*return*/, this.loadItem(result)];
                }
            });
        }); });
    };
    EntityRepositoryBase.prototype.ReadAll = function () {
        var _this = this;
        var composeBuilder = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            composeBuilder[_i] = arguments[_i];
        }
        return _super.prototype.UseList.call(this, function (list) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, items, result;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        items = (_a = (_b = list.items).select.apply(_b, this.Selects())).expand.apply(_a, this.Expands());
                        if (composeBuilder && composeBuilder.length > 0) {
                            items = this.UseCompose(items, composeBuilder);
                        }
                        return [4 /*yield*/, items.get()];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, result.map(function (v, i, a) { return _this.loadItem(v); })];
                }
            });
        }); });
    };
    EntityRepositoryBase.prototype.loadItem = function (item) {
        var e = this.createEntityType();
        e.Id = item["Id"];
        e.Title = item["Title"];
        e.Author = this.GetPrincipalInfo(item["Author"]);
        return e;
    };
    EntityRepositoryBase.prototype.createItem = function (item) {
        return {
            Title: item.Title
        };
    };
    EntityRepositoryBase.prototype.ReadByCamlQuery = function (viewXml) {
        var _this = this;
        return _super.prototype.UseList.call(this, function (list) { return __awaiter(_this, void 0, void 0, function () {
            var query, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            ViewXml: viewXml
                        };
                        return [4 /*yield*/, list.getItemsByCAMLQuery(query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (v, i, a) { return _this.loadItem(v); })];
                }
            });
        }); });
    };
    EntityRepositoryBase.prototype.ReadByCamlQueryCaml = function (caml, rowLimit) {
        var _this = this;
        var viewXml = "<View><ViewFields>" + this.BuildViewFieldsString() + "</ViewFields><Query>" + caml + "<OrderBy><FieldRef Name='Title' /></OrderBy></Query><RowLimit>" + (rowLimit ? rowLimit : Number.MAX_VALUE) + "</RowLimit></View>";
        return _super.prototype.UseList.call(this, function (list) { return __awaiter(_this, void 0, void 0, function () {
            var query, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            ViewXml: viewXml
                        };
                        return [4 /*yield*/, list.getItemsByCAMLQuery(query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (v, i, a) { return _this.loadItem(v); })];
                }
            });
        }); });
    };
    EntityRepositoryBase.prototype.GetFormatedDateString = function (dtm) {
        return dtm.getMonth() + 1 + "/" + dtm.getDate() + "/" + dtm.getFullYear() + " " + dtm.getHours() + ":" + dtm.getMinutes() + ":" + dtm.getSeconds();
    };
    EntityRepositoryBase.prototype.BuildViewFieldsString = function () {
        var selectFields = this.Selects();
        var viewFields = selectFields.map(function (v, i, a) { return "<FieldRef Name='" + v + "' />"; });
        var viewFieldsString = viewFields.join("");
        return viewFieldsString;
    };
    EntityRepositoryBase.prototype.UseCompose = function (items, composeBuilder) {
        var newItems = items;
        composeBuilder.forEach(function (element) {
            newItems = element(newItems);
        });
        return newItems;
    };
    EntityRepositoryBase.prototype.EnsureFolder = function (folderStructure, list, spRestClient) {
        return __awaiter(this, void 0, void 0, function () {
            var l, listTitle, folderParts, currFldr, i, v, currFldrUrl, exist, folderItemId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, list.select("Title").get()];
                    case 1:
                        l = _a.sent();
                        listTitle = l.Title;
                        folderParts = folderStructure.split("/");
                        return [4 /*yield*/, list.rootFolder.select("ServerRelativeUrl").get()];
                    case 2:
                        currFldr = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < folderParts.length)) return [3 /*break*/, 10];
                        v = folderParts[i];
                        currFldrUrl = currFldr.ServerRelativeUrl;
                        return [4 /*yield*/, this.CheckFolder(currFldrUrl + "/" + v, this._web)];
                    case 4:
                        exist = _a.sent();
                        if (!!exist) return [3 /*break*/, 8];
                        return [4 /*yield*/, spRestClient.CreateListItemInFolder(listTitle, currFldrUrl, {
                                ContentTypeId: '0x0120',
                                FileLeafRef: v,
                                Title: v
                            })];
                    case 5:
                        folderItemId = _a.sent();
                        return [4 /*yield*/, list.items.getById(folderItemId).update({ Title: v, FileLeafRef: v })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this._web.getFolderByServerRelativePath(currFldr.ServerRelativeUrl + "/" + v).get()];
                    case 7:
                        currFldr = _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        currFldr = exist;
                        _a.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 3];
                    case 10: return [2 /*return*/, currFldr];
                }
            });
        });
    };
    EntityRepositoryBase.prototype.CheckFolder = function (folderUrl, web) {
        return __awaiter(this, void 0, void 0, function () {
            var folder, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, web.getFolderByServerRelativeUrl(folderUrl).get()];
                    case 1:
                        folder = _b.sent();
                        return [2 /*return*/, folder];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EntityRepositoryBase.prototype.SetUserField = function (obj, userField, id) {
        obj[userField + "Id"] = id;
    };
    EntityRepositoryBase.prototype.SetUsersField = function (obj, userField, ids) {
        obj[userField + "Id"] = { results: ids };
    };
    EntityRepositoryBase.prototype.GetPrincipalInfos = function (users) {
        var _this = this;
        return users.map(function (v, i, a) { return _this.GetPrincipalInfo(v); });
    };
    EntityRepositoryBase.prototype.GetPrincipalInfo = function (user) {
        if (Object.keys(user).indexOf("Id") === -1)
            throw new Error("User object doesnot have Id property expanded, please include Id as expanded property");
        if (Object.keys(user).indexOf("UserName") === -1)
            throw new Error("User object doesnot have UserName property expanded, there is no way how to check if it is user or group, please include UserName as expanded property");
        var isGroup = !user.UserName;
        var sd = new SectionDesignation(this._webUrl);
        return isGroup ?
            new GroupInfo(user.Id, user.Name, "") :
            new UserInfo(sd, user.Id, user.UserName, user.FirstName && user.LastName ? user.FirstName + " " + user.LastName : "", user.EMail);
    };
    return EntityRepositoryBase;
}(SpRepositoryBase));
export { EntityRepositoryBase };
//# sourceMappingURL=EntityRepositoryBase.js.map