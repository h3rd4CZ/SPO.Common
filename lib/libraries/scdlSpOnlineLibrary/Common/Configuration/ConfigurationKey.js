var ConfigurationKey = /** @class */ (function () {
    function ConfigurationKey(module, code) {
        if (!module)
            throw new Error("module is null");
        if (!code)
            throw new Error("code is null");
        this._module = module;
        this._code = code;
    }
    ConfigurationKey.prototype.ToString = function () {
        return this._module + "__" + this._code;
    };
    return ConfigurationKey;
}());
export { ConfigurationKey };
//# sourceMappingURL=ConfigurationKey.js.map