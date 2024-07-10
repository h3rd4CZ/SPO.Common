import { IConfigurationRepositoryFactory } from "../../Common.DataAccess/Configuration/IConfigurationRepositoryFactory";
import { sp, Web} from "@pnp/sp";
import { IConfigurationRepository } from "../../Common.DataAccess/Configuration/IConfigurationRepository";
import { ConfigurationEntity } from "../../Common.DataAccess/Configuration/ConfigurationEntity";
import { ConfigurationRepository } from "./ConfigurationRepository";
import * as Constants from '../../Common.DataAccess/Configuration/Const';

class ConfigurationRepositoryFactory implements IConfigurationRepositoryFactory{
    public CreateConfigurationRepository(web ?: Web) : IConfigurationRepository<ConfigurationEntity>{

        return new ConfigurationRepository(
            w => w.lists.getByTitle(Constants.Common.DataAccess.Const.Lists.CONFIGURATION_REPOSITORY_TITLE),
            web ? new Web(web) : sp.web);
    }
}

var configurationRepositoryFactory = new ConfigurationRepositoryFactory();

export default configurationRepositoryFactory;