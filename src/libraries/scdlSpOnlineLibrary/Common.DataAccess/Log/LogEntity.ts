import { EntityBase } from "../Entities/EntityBase";

export enum ApplicationLogLevel{
    Unknown = 0,
    Information = 1,
    Debug = 1 << 1,
    Error = 1 << 2
}

export class LogEntity extends EntityBase{

    public Message : string;
    public Source  : string;
    public Level : ApplicationLogLevel;
    public Date : Date;
}