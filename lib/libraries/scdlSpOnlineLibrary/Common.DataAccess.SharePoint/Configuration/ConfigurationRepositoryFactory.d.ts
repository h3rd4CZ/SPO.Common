import { IConfigurationRepositoryFactory } from "../../Common.DataAccess/Configuration/IConfigurationRepositoryFactory";
import { Web } from "@pnp/sp";
import { IConfigurationRepository } from "../../Common.DataAccess/Configuration/IConfigurationRepository";
import { ConfigurationEntity } from "../../Common.DataAccess/Configuration/ConfigurationEntity";
declare class ConfigurationRepositoryFactory implements IConfigurationRepositoryFactory {
    CreateConfigurationRepository(web?: Web): IConfigurationRepository<ConfigurationEntity>;
}
declare var configurationRepositoryFactory: ConfigurationRepositoryFactory;
export default configurationRepositoryFactory;
//# sourceMappingURL=ConfigurationRepositoryFactory.d.ts.map