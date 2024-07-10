import { Web } from "@pnp/sp";
import { IConfigurationRepository } from "./IConfigurationRepository";
import { ConfigurationEntity } from "./ConfigurationEntity";
export interface IConfigurationRepositoryFactory {
    CreateConfigurationRepository(web?: Web): IConfigurationRepository<ConfigurationEntity>;
}
//# sourceMappingURL=IConfigurationRepositoryFactory.d.ts.map