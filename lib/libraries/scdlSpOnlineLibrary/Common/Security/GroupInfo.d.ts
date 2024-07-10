import { IPrincipalInfo } from "./IPrincipalInfo";
export declare class GroupInfo implements IPrincipalInfo {
    Id: number;
    Name: string;
    Description: string;
    readonly DisplayName: string;
    readonly Isvalid: boolean;
    readonly IsGroup: boolean;
    constructor(Id: number, Name: string, Description: string);
}
//# sourceMappingURL=GroupInfo.d.ts.map