import { EntityBase } from "../Entities/EntityBase";
import { IEntityRepositoryBase } from "../Repository/IEntityRepositoryBase";
export interface ILogRepository<T extends EntityBase> extends IEntityRepositoryBase<T> {
    WriteLog(log: T): Promise<void>;
}
//# sourceMappingURL=ILogRepository.d.ts.map