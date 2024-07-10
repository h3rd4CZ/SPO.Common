import { SPRuntimeConfigImpl } from "@pnp/sp/src/config/splibconfig";

export class ConfigurationKey{

    private _module : string;
    private _code : string;

    constructor(module : string, code : string) {
        if(!module) throw new Error("module is null");
        if(!code) throw new Error("code is null");

        this._module = module;
        this._code = code;
    }

    public ToString() : string
    {
        return `${this._module}__${this._code}`;
    }
}