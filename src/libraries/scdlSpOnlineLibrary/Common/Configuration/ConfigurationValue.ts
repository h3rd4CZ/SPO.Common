import { ConfigurationKey } from "./ConfigurationKey";
import { EntityBase } from "../../Common.DataAccess/index";

export class ConfigurationValue extends EntityBase{

    public Key : ConfigurationKey;

    private _valueAsObject : string;
    public get AsObject() : string {
        return this._valueAsObject;
    }
    public set AsObject(v : string) {
        this._valueAsObject = v;
    }

    public get AsString() : string {
         var obj = this._valueAsObject;
         return obj ? obj.toString() : null;
    }

    public get AsInt() : number{
        let str = this.AsString;
        return str ? parseInt(str) : null;
    }

    public get AsFloat() : number{
        let str = this.AsString;
        return str ? parseFloat(str) : null;
    }

    public get AsDate() : Date{
        let str = this.AsString;
        return new Date(str);
    }

    public get AsBoolean() : boolean{
        let str = this.AsString;

        if(str)
        {
            if(str.toLowerCase() === "false") return false;
            if(str.toLowerCase() === "true") return true;
        }

        return null;
    }

    constructor( key : ConfigurationKey, value : any) {
                super();
                this.Key = key;
                this.AsObject = value;
    }

}