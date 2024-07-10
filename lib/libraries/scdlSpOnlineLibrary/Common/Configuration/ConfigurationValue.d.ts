import { ConfigurationKey } from "./ConfigurationKey";
import { EntityBase } from "../../Common.DataAccess/index";
export declare class ConfigurationValue extends EntityBase {
    Key: ConfigurationKey;
    private _valueAsObject;
    AsObject: string;
    readonly AsString: string;
    readonly AsInt: number;
    readonly AsFloat: number;
    readonly AsDate: Date;
    readonly AsBoolean: boolean;
    constructor(key: ConfigurationKey, value: any);
}
//# sourceMappingURL=ConfigurationValue.d.ts.map