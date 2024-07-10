var UserInfo = /** @class */ (function () {
    function UserInfo(SectionDesignation, Id, Name, DisplayName, Email) {
        this.SectionDesignation = SectionDesignation;
        this.Id = Id;
        this.Name = Name;
        this.DisplayName = DisplayName;
        this.Email = Email;
    }
    Object.defineProperty(UserInfo.prototype, "Isvalid", {
        get: function () { return this.Id !== 0; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserInfo.prototype, "IsGroup", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserInfo, "UnknownUser", {
        get: function () {
            return new UserInfo(null, 0, null, "?", null);
        },
        enumerable: true,
        configurable: true
    });
    return UserInfo;
}());
export { UserInfo };
//# sourceMappingURL=UserInfo.js.map