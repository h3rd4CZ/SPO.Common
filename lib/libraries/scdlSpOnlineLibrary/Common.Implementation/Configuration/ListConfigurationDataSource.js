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
import { ConfigurationValue } from "../../Common/Configuration/ConfigurationValue";
import { ConfigurationDataSourceBase } from "../../Common.DataAccess/Configuration/ConfigurationDataSourceBase";
import configurationFactory from '../../Common.DataAccess.SharePoint/Configuration/ConfigurationRepositoryFactory';
import { ConfigurationEntity } from "../../Common.DataAccess/Configuration/ConfigurationEntity";
var ListConfigurationDataSource = /** @class */ (function (_super) {
    __extends(ListConfigurationDataSource, _super);
    function ListConfigurationDataSource() {
        return _super.call(this) || this;
    }
    ListConfigurationDataSource.GetPropertyKey = function (key) {
        return key.ToString();
    };
    ListConfigurationDataSource.ConvertValueToString = function (value) {
        return value.toString();
    };
    ListConfigurationDataSource.prototype.GetValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var propertyKey, repo, val, configurationValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        propertyKey = ListConfigurationDataSource.GetPropertyKey(key);
                        repo = configurationFactory.CreateConfigurationRepository();
                        return [4 /*yield*/, repo.GetByKey(propertyKey)];
                    case 1:
                        val = _a.sent();
                        if (!val)
                            return [2 /*return*/, Promise.resolve(null)];
                        configurationValue = new ConfigurationValue(key, val.Value);
                        return [2 /*return*/, configurationValue];
                }
            });
        });
    };
    ListConfigurationDataSource.prototype.SetValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, promissedVal, propertyKey, valueAsString, configurationValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = configurationFactory.CreateConfigurationRepository();
                        return [4 /*yield*/, value];
                    case 1:
                        promissedVal = _a.sent();
                        propertyKey = ListConfigurationDataSource.GetPropertyKey(key);
                        valueAsString = promissedVal != null ? ListConfigurationDataSource.ConvertValueToString(promissedVal) : null;
                        return [4 /*yield*/, repo.GetByKey(propertyKey)];
                    case 2:
                        configurationValue = _a.sent();
                        if (!configurationValue) return [3 /*break*/, 4];
                        configurationValue.Value = valueAsString;
                        return [4 /*yield*/, repo.Update(configurationValue)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        configurationValue = new ConfigurationEntity();
                        configurationValue.Key = propertyKey;
                        configurationValue.Value = valueAsString;
                        repo.Create(configurationValue);
                        _a.label = 5;
                    case 5: return [2 /*return*/, Promise.resolve(null)];
                }
            });
        });
    };
    ListConfigurationDataSource.prototype.SaveChanges = function () {
        return Promise.resolve(null);
    };
    return ListConfigurationDataSource;
}(ConfigurationDataSourceBase));
export { ListConfigurationDataSource };
//# sourceMappingURL=ListConfigurationDataSource.js.map