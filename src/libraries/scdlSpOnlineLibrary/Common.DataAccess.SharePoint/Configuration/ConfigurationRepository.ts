import { EntityRepositoryBase } from "../../Common.DataAccess/Repository/EntityRepositoryBase";
import { ConfigurationEntity } from "../../Common.DataAccess/Configuration/ConfigurationEntity";
import { IConfigurationRepository } from "../../Common.DataAccess/Configuration/IConfigurationRepository";
import { Web, List, Fields, Item, sp } from "@pnp/sp";

import * as Constants from '../../Common.DataAccess/Configuration/Const';
import { TypedHash } from "@pnp/common";

export class ConfigurationRepository extends EntityRepositoryBase<ConfigurationEntity> implements IConfigurationRepository<ConfigurationEntity>
{

    protected Selects() : string[]{
        var a = super.Selects()
        a.push(Constants.Common.DataAccess.Const.Fields.CONFIGURATION_VALUE);
        a.push(Constants.Common.DataAccess.Const.Fields.CONFIGURATION_KEY);
        return a;
    }

    constructor(listResolver : (web : Web) => List, web : Web) {
        super(ConfigurationEntity, listResolver, web);
    }

    public async GetByKey(key: string): Promise<ConfigurationEntity> {

        let configKeyField = Constants.Common.DataAccess.Const.Fields.CONFIGURATION_KEY;

        const caml = `<Where><Eq><FieldRef Name='${configKeyField}' /><Value Type='Text'>${key}</Value></Eq></Where>`;

        var data = await super.ReadByCamlQueryCaml(caml, 1);

        return data.length > 0 ? data[0] : null;
    }

    protected loadItem(item : Item) : ConfigurationEntity {

        var e = super.loadItem(item);
        e.Key = item[Constants.Common.DataAccess.Const.Fields.CONFIGURATION_KEY];
        e.Value = item[Constants.Common.DataAccess.Const.Fields.CONFIGURATION_VALUE];
        return e;
    }

    protected createItem(item : ConfigurationEntity) : TypedHash<any> {

        var base = super.createItem(item);

        base[Constants.Common.DataAccess.Const.Fields.CONFIGURATION_KEY] = item.Key;
        base[Constants.Common.DataAccess.Const.Fields.CONFIGURATION_VALUE] = item.Value;

        return base;
    }
}