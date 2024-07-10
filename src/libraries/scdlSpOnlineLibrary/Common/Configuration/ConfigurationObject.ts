import { IConfigurationDataSource } from "./IConfigurationDataSource";

export abstract class ConfigurationObject{
    protected configurationDataSource : IConfigurationDataSource;

    protected constructor(dataSource : IConfigurationDataSource) {
        this.configurationDataSource = dataSource;
    }

    public async SaveChangees() : Promise<void>{
        await this.configurationDataSource.SaveChanges();
    }
}