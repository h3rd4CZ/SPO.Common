import { ConfigurationKey } from "../../Common/Configuration/ConfigurationKey";
import { ConfigurationObject } from "../../Common/Configuration/ConfigurationObject";
import { IConfigurationDataSource } from "../../Common/Configuration/IConfigurationDataSource";
import { ListConfigurationDataSource } from "./ListConfigurationDataSource";
import { ConfigurationValue } from "../../Common/Configuration/ConfigurationValue";

class CommonConfiguration extends ConfigurationObject{

    private static CONFIGURATION_MODULE_NAME : string = "Common";

        private static readonly EnvironmentNameKey  : ConfigurationKey = new ConfigurationKey( CommonConfiguration.CONFIGURATION_MODULE_NAME, "EnvironmentName");

        public get EnvironmentName() : Promise<string>
        {
            return new Promise(async (resolve : (s : string) => void, reject) =>{
                 let c = await this.configurationDataSource.GetDefaultValue(CommonConfiguration.EnvironmentNameKey, "?");
                 resolve(c.AsString);
            });
        }

        public set EnvironmentName(val : Promise<string>){
                this.configurationDataSource.SetValue(CommonConfiguration.EnvironmentNameKey, val);
        }

        constructor(dataSource : IConfigurationDataSource )
        {
            super(dataSource);
        }
}

let listConfigurationDataSource = new ListConfigurationDataSource();
var c = new CommonConfiguration(listConfigurationDataSource);

export default c;

