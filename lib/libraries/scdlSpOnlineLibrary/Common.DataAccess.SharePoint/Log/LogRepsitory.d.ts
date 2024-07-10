import { ILogRepository } from "../../Common.DataAccess/Log/ILogRepository";
import { LogEntity } from "../../Common.DataAccess/Log/LogEntity";
import { EntityRepositoryBase } from "../../../../index";
import { Web, List, Item } from "@pnp/sp";
import { TypedHash } from "@pnp/common";
export declare class LogRepository extends EntityRepositoryBase<LogEntity> implements ILogRepository<LogEntity> {
    protected Selects(): string[];
    constructor(listResolver: (web: Web) => List, web: Web);
    WriteLog(log: LogEntity): Promise<void>;
    protected loadItem(item: Item): LogEntity;
    protected createItem(item: LogEntity): TypedHash<any>;
}
//# sourceMappingURL=LogRepsitory.d.ts.map