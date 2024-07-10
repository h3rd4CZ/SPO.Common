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
import { EntityBase } from "../../Common.DataAccess/index";
var ConfigurationValue = /** @class */ (function (_super) {
    __extends(ConfigurationValue, _super);
    function ConfigurationValue(key, value) {
        var _this = _super.call(this) || this;
        _this.Key = key;
        _this.AsObject = value;
        return _this;
    }
    Object.defineProperty(ConfigurationValue.prototype, "AsObject", {
        get: function () {
            return this._valueAsObject;
        },
        set: function (v) {
            this._valueAsObject = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationValue.prototype, "AsString", {
        get: function () {
            var obj = this._valueAsObject;
            return obj ? obj.toString() : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationValue.prototype, "AsInt", {
        get: function () {
            var str = this.AsString;
            return str ? parseInt(str) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationValue.prototype, "AsFloat", {
        get: function () {
            var str = this.AsString;
            return str ? parseFloat(str) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationValue.prototype, "AsDate", {
        get: function () {
            var str = this.AsString;
            return new Date(str);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationValue.prototype, "AsBoolean", {
        get: function () {
            var str = this.AsString;
            if (str) {
                if (str.toLowerCase() === "false")
                    return false;
                if (str.toLowerCase() === "true")
                    return true;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return ConfigurationValue;
}(EntityBase));
export { ConfigurationValue };
//# sourceMappingURL=ConfigurationValue.js.map