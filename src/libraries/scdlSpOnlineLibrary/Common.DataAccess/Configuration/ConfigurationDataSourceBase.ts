import { IConfigurationDataSource } from "../../Common/Configuration/IConfigurationDataSource";
import { ConfigurationValue } from "../../Common/Configuration/ConfigurationValue";
import { ConfigurationKey } from "../../Common/Configuration/ConfigurationKey";

export abstract class ConfigurationDataSourceBase implements IConfigurationDataSource{


    constructor() {}

    public async GetRequiredValue( key : ConfigurationKey) : Promise<ConfigurationValue>
    {
        let value : ConfigurationValue = await this.GetValue(key);

        if (value == null)
            throw new Error(`Configuration value with key ${key.ToString()} not found.`);

        if (!value.AsString)
            throw new Error(`Configuration value with key ${key.ToString()} is empty.`);

        return await value;
    }

    async GetDefaultValue(key : ConfigurationKey, defaultValue : any) : Promise<ConfigurationValue>{
        let val =  await this.GetValue(key);
        return !val ? ConfigurationDataSourceBase.GetDefaultVal(key, defaultValue) : val;
    }

    private static GetDefaultVal(key : ConfigurationKey, defaultValue : any ) : ConfigurationValue
    {
        return new ConfigurationValue(key, defaultValue);
    }

    public async abstract GetValue(key : ConfigurationKey) : Promise<ConfigurationValue>

    public SetValue(key : ConfigurationKey , value : Promise<any> ) : Promise<void>
    {
        throw new Error("Not supported");
    }

    public SaveChanges() : Promise<void>
    {
        throw new Error("Not supported");
    }
}