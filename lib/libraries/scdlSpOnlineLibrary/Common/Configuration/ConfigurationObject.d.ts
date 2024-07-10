import { IConfigurationDataSource } from "./IConfigurationDataSource";
export declare abstract class ConfigurationObject {
    protected configurationDataSource: IConfigurationDataSource;
    protected constructor(dataSource: IConfigurationDataSource);
    SaveChangees(): Promise<void>;
}
//# sourceMappingURL=ConfigurationObject.d.ts.map