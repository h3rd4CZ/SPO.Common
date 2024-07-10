import { IEntityRepositoryBase } from "../Repository/IEntityRepositoryBase";
import { EntityBase } from "../Entities/EntityBase";
export interface IConfigurationRepository<T extends EntityBase> extends IEntityRepositoryBase<T> {
    GetByKey(key: string): Promise<T>;
}
//# sourceMappingURL=IConfigurationRepository.d.ts.map