import { EntityRepositoryBase } from "../../Common.DataAccess/Repository/EntityRepositoryBase";
import { ConfigurationEntity } from "../../Common.DataAccess/Configuration/ConfigurationEntity";
import { IConfigurationRepository } from "../../Common.DataAccess/Configuration/IConfigurationRepository";
import { Web, List, Item } from "@pnp/sp";
import { TypedHash } from "@pnp/common";
export declare class ConfigurationRepository extends EntityRepositoryBase<ConfigurationEntity> implements IConfigurationRepository<ConfigurationEntity> {
    protected Selects(): string[];
    constructor(listResolver: (web: Web) => List, web: Web);
    GetByKey(key: string): Promise<ConfigurationEntity>;
    protected loadItem(item: Item): ConfigurationEntity;
    protected createItem(item: ConfigurationEntity): TypedHash<any>;
}
//# sourceMappingURL=ConfigurationRepository.d.ts.map