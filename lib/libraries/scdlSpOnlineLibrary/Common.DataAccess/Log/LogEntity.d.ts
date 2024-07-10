import { EntityBase } from "../Entities/EntityBase";
export declare enum ApplicationLogLevel {
    Unknown = 0,
    Information = 1,
    Debug = 2,
    Error = 4
}
export declare class LogEntity extends EntityBase {
    Message: string;
    Source: string;
    Level: ApplicationLogLevel;
    Date: Date;
}
//# sourceMappingURL=LogEntity.d.ts.map