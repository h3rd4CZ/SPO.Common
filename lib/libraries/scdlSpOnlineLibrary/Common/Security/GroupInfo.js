var GroupInfo = /** @class */ (function () {
    function GroupInfo(Id, Name, Description) {
        this.Id = Id;
        this.Name = Name;
        this.Description = Description;
    }
    Object.defineProperty(GroupInfo.prototype, "DisplayName", {
        get: function () { return this.Name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupInfo.prototype, "Isvalid", {
        get: function () { return this.Id !== 0; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(GroupInfo.prototype, "IsGroup", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    ;
    return GroupInfo;
}());
export { GroupInfo };
//# sourceMappingURL=GroupInfo.js.map