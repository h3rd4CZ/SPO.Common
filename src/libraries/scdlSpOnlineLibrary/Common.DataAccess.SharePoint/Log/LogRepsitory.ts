import { ILogRepository } from "../../Common.DataAccess/Log/ILogRepository";
import { LogEntity, ApplicationLogLevel } from "../../Common.DataAccess/Log/LogEntity";

import * as Constants from '../../Common.DataAccess/Configuration/Const';
import { SpRepositoryBase } from "../../Common.DataAccess/Repository/SpRepositoryBase";
import { EntityRepositoryBase } from "../../../../index";
import { Web, List, Item, ChangeLogitemQuery } from "@pnp/sp";
import { TypedHash } from "@pnp/common";

export class LogRepository extends EntityRepositoryBase<LogEntity> implements ILogRepository<LogEntity>{


    protected Selects() : string[]{
        var a = super.Selects()
        a.push(Constants.Common.DataAccess.Const.Fields.LOG_MESSAGE);
        a.push(Constants.Common.DataAccess.Const.Fields.LOG_SOURCE);
        a.push(Constants.Common.DataAccess.Const.Fields.LOG_LEVEL);
        return a;
    }

    constructor(listResolver : (web : Web) => List, web : Web) {
        super(LogEntity, listResolver, web);
    }

    async WriteLog(log: LogEntity): Promise<void> {

        var dtm = new Date();

        if(!log.Title) log.Title = `Log`;
        if(!log.Date) log.Date = dtm;

        await this.Create(log, `${dtm.getFullYear()}/${dtm.getMonth() + 1}/${dtm.getDate()}`);

    }

    protected loadItem(item : Item) : LogEntity {

        var e = super.loadItem(item);
        e.Message = item[Constants.Common.DataAccess.Const.Fields.LOG_MESSAGE];
        e.Source = item[Constants.Common.DataAccess.Const.Fields.LOG_SOURCE];
        e.Date = item[Constants.Common.DataAccess.Const.Fields.LOG_DATE];

        let appLevel : ApplicationLogLevel = item[Constants.Common.DataAccess.Const.Fields.LOG_LEVEL];
        e.Level = appLevel;

        return e;
    }

    protected createItem(item : LogEntity) : TypedHash<any> {

        var base = super.createItem(item);

        base[Constants.Common.DataAccess.Const.Fields.LOG_MESSAGE] = item.Message;
        base[Constants.Common.DataAccess.Const.Fields.LOG_SOURCE] = item.Source;

        let applevel : string = ApplicationLogLevel[item.Level];
        base[Constants.Common.DataAccess.Const.Fields.LOG_LEVEL] = applevel;
        base[Constants.Common.DataAccess.Const.Fields.LOG_DATE] =  this.GetFormatedDateString(item.Date);

        return base;
    }


}