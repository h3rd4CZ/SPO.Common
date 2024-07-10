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
import { EntityBase } from "../Entities/EntityBase";
export var ApplicationLogLevel;
(function (ApplicationLogLevel) {
    ApplicationLogLevel[ApplicationLogLevel["Unknown"] = 0] = "Unknown";
    ApplicationLogLevel[ApplicationLogLevel["Information"] = 1] = "Information";
    ApplicationLogLevel[ApplicationLogLevel["Debug"] = 2] = "Debug";
    ApplicationLogLevel[ApplicationLogLevel["Error"] = 4] = "Error";
})(ApplicationLogLevel || (ApplicationLogLevel = {}));
var LogEntity = /** @class */ (function (_super) {
    __extends(LogEntity, _super);
    function LogEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LogEntity;
}(EntityBase));
export { LogEntity };
//# sourceMappingURL=LogEntity.js.map