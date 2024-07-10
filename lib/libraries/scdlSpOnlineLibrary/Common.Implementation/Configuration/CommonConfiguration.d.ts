import { ConfigurationObject } from "../../Common/Configuration/ConfigurationObject";
import { IConfigurationDataSource } from "../../Common/Configuration/IConfigurationDataSource";
declare class CommonConfiguration extends ConfigurationObject {
    private static CONFIGURATION_MODULE_NAME;
    private static readonly EnvironmentNameKey;
    EnvironmentName: Promise<string>;
    constructor(dataSource: IConfigurationDataSource);
}
declare var c: CommonConfiguration;
export default c;
//# sourceMappingURL=CommonConfiguration.d.ts.map