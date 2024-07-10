import { IPrincipalInfo } from "./IPrincipalInfo";
import { SectionDesignation } from "./SectionDesignation";
export declare class UserInfo implements IPrincipalInfo {
    SectionDesignation: SectionDesignation;
    Id: number;
    Name: string;
    DisplayName: string;
    Email: string;
    readonly Isvalid: boolean;
    readonly IsGroup: boolean;
    static readonly UnknownUser: UserInfo;
    constructor(SectionDesignation: SectionDesignation, Id: number, Name: string, DisplayName: string, Email: string);
}
//# sourceMappingURL=UserInfo.d.ts.map