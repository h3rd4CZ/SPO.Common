import { sp, Web } from "@pnp/sp";
import { ConfigurationRepository } from "./ConfigurationRepository";
import * as Constants from '../../Common.DataAccess/Configuration/Const';
var ConfigurationRepositoryFactory = /** @class */ (function () {
    function ConfigurationRepositoryFactory() {
    }
    ConfigurationRepositoryFactory.prototype.CreateConfigurationRepository = function (web) {
        return new ConfigurationRepository(function (w) { return w.lists.getByTitle(Constants.Common.DataAccess.Const.Lists.CONFIGURATION_REPOSITORY_TITLE); }, web ? new Web(web) : sp.web);
    };
    return ConfigurationRepositoryFactory;
}());
var configurationRepositoryFactory = new ConfigurationRepositoryFactory();
export default configurationRepositoryFactory;
//# sourceMappingURL=ConfigurationRepositoryFactory.js.map