import { IPrincipalInfo } from "./IPrincipalInfo";

export class GroupInfo implements IPrincipalInfo
{
   public get DisplayName() : string { return this.Name;}

    public get Isvalid(): boolean{ return this.Id !== 0; };

    public get IsGroup(): boolean{ return true; };

    constructor(public Id : number, public Name  :string, public Description : string) { }
}
