import { IPrincipalInfo } from "./IPrincipalInfo";
import { SectionDesignation } from "./SectionDesignation";

export class UserInfo implements IPrincipalInfo
{
    public get Isvalid(): boolean{ return this.Id !== 0; };
    public get IsGroup(): boolean{ return false; };

    public static get UnknownUser() : UserInfo
    {
        return new UserInfo(null, 0, null, "?", null);
    }

    constructor(public SectionDesignation : SectionDesignation, public Id : number, public Name  :string, public DisplayName : string, public Email : string) {

    }
}

