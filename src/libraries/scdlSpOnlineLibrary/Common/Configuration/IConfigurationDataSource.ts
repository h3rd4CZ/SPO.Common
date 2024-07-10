import { ConfigurationKey } from "./ConfigurationKey";
import { ConfigurationValue } from "./ConfigurationValue";

export interface IConfigurationDataSource{

        GetValue(key: ConfigurationKey) : Promise<ConfigurationValue>;
        GetDefaultValue(key : ConfigurationKey , defaultValue : any) :  Promise<ConfigurationValue>;
        GetRequiredValue(key : ConfigurationKey) : Promise<ConfigurationValue>;
        SetValue(key : ConfigurationKey, value : Promise<any>) : Promise<void>;
        SaveChanges() : Promise<void>;
}