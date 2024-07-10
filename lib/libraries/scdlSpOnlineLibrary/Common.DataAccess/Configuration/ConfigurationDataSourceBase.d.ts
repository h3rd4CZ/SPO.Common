import { IConfigurationDataSource } from "../../Common/Configuration/IConfigurationDataSource";
import { ConfigurationValue } from "../../Common/Configuration/ConfigurationValue";
import { ConfigurationKey } from "../../Common/Configuration/ConfigurationKey";
export declare abstract class ConfigurationDataSourceBase implements IConfigurationDataSource {
    constructor();
    GetRequiredValue(key: ConfigurationKey): Promise<ConfigurationValue>;
    GetDefaultValue(key: ConfigurationKey, defaultValue: any): Promise<ConfigurationValue>;
    private static GetDefaultVal;
    abstract GetValue(key: ConfigurationKey): Promise<ConfigurationValue>;
    SetValue(key: ConfigurationKey, value: Promise<any>): Promise<void>;
    SaveChanges(): Promise<void>;
}
//# sourceMappingURL=ConfigurationDataSourceBase.d.ts.map