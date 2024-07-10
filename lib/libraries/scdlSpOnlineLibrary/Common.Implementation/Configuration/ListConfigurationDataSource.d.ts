import { ConfigurationKey } from "../../Common/Configuration/ConfigurationKey";
import { ConfigurationValue } from "../../Common/Configuration/ConfigurationValue";
import { ConfigurationDataSourceBase } from "../../Common.DataAccess/Configuration/ConfigurationDataSourceBase";
export declare class ListConfigurationDataSource extends ConfigurationDataSourceBase {
    private static GetPropertyKey;
    constructor();
    private static ConvertValueToString;
    GetValue(key: ConfigurationKey): Promise<ConfigurationValue>;
    SetValue(key: ConfigurationKey, value: Promise<any>): Promise<void>;
    SaveChanges(): Promise<void>;
}
//# sourceMappingURL=ListConfigurationDataSource.d.ts.map