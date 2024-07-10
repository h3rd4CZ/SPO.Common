export var Common;
(function (Common) {
    var DataAccess;
    (function (DataAccess) {
        var Const;
        (function (Const) {
            var Fields = /** @class */ (function () {
                function Fields() {
                }
                Fields.CONFIGURATION_KEY = "scdlOnlineConfigurationKey";
                Fields.CONFIGURATION_VALUE = "scdlOnlineConfigurationValue";
                Fields.LOG_MESSAGE = "scdlOnlineLogMessage";
                Fields.LOG_SOURCE = "scdlOnlineLogSource";
                Fields.LOG_LEVEL = "scdlOnlineLogLevel";
                Fields.LOG_DATE = "scdlOnlineLogDate";
                return Fields;
            }());
            Const.Fields = Fields;
            var Lists = /** @class */ (function () {
                function Lists() {
                }
                Lists.CONFIGURATION_REPOSITORY_TITLE = "SCDL Configuration";
                Lists.LOG_REPOSITORY_TITLE = "SCDL Application Log";
                return Lists;
            }());
            Const.Lists = Lists;
        })(Const = DataAccess.Const || (DataAccess.Const = {}));
    })(DataAccess = Common.DataAccess || (Common.DataAccess = {}));
})(Common || (Common = {}));
//# sourceMappingURL=Const.js.map