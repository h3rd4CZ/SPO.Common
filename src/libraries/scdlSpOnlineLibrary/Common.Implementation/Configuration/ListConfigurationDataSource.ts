import { IConfigurationDataSource } from "../../Common/Configuration/IConfigurationDataSource";
import { ConfigurationKey } from "../../Common/Configuration/ConfigurationKey";
import { ConfigurationValue } from "../../Common/Configuration/ConfigurationValue";
import { ConfigurationDataSourceBase } from "../../Common.DataAccess/Configuration/ConfigurationDataSourceBase";
import configurationFactory from '../../Common.DataAccess.SharePoint/Configuration/ConfigurationRepositoryFactory';
import { IConfigurationRepository } from "../../Common.DataAccess/Configuration/IConfigurationRepository";
import { ConfigurationEntity } from "../../Common.DataAccess/Configuration/ConfigurationEntity";

export class ListConfigurationDataSource extends ConfigurationDataSourceBase{

    private static GetPropertyKey(key : ConfigurationKey) : string
        {
            return key.ToString();
        }

        constructor() {
            super();
        }

        private static ConvertValueToString( value : any)  :string
        {
            return value.toString();
        }

        async GetValue(key : ConfigurationKey) : Promise<ConfigurationValue>
        {
            let propertyKey : string = ListConfigurationDataSource.GetPropertyKey(key);

            let repo : IConfigurationRepository<ConfigurationEntity> = configurationFactory.CreateConfigurationRepository()

            let val = await repo.GetByKey(propertyKey);

            if(!val) return Promise.resolve(null);

            let configurationValue = new ConfigurationValue(key, val.Value);

            return configurationValue;
        }

        async SetValue(key : ConfigurationKey, value : Promise<any>) : Promise<void>
        {
            let repo : IConfigurationRepository<ConfigurationEntity> = configurationFactory.CreateConfigurationRepository();

            var promissedVal = await value;

            let propertyKey : string = ListConfigurationDataSource.GetPropertyKey(key);

            let valueAsString : string = promissedVal != null ? ListConfigurationDataSource.ConvertValueToString(promissedVal) : null;

            let configurationValue = await repo.GetByKey(propertyKey);

            if (configurationValue)
            {
                configurationValue.Value = valueAsString;
                await repo.Update(configurationValue);
            }
            else
            {
                configurationValue = new ConfigurationEntity();
                configurationValue.Key = propertyKey;
                configurationValue.Value = valueAsString;

                repo.Create(configurationValue);
            }

            return Promise.resolve(null);
        }

        public SaveChanges() : Promise<void>
        {
            return Promise.resolve(null);
        }
}