import { SpRepositoryBase } from './SpRepositoryBase';
import { IEntityRepositoryBase } from './IEntityRepositoryBase';
import { EntityBase } from '../Entities/EntityBase';
import { Web, List, Item, Items, ItemUpdateResult, ItemAddResult } from '@pnp/sp';
import { TypedHash } from '@pnp/common';
import { IPrincipalInfo } from '../../Common/Security/IPrincipalInfo';
export declare abstract class EntityRepositoryBase<T extends EntityBase> extends SpRepositoryBase implements IEntityRepositoryBase<T> {
    private entityType;
    protected Selects(): string[];
    protected Expands(): string[];
    constructor(entityType: new () => T, listResolver: (web: Web) => List, web: Web);
    protected createEntityType(): T;
    Create(entity: T, folder?: string): Promise<ItemAddResult>;
    Update(entity: T): Promise<ItemUpdateResult>;
    Delete(id: number): Promise<void>;
    ReadById(id: number, ...composeBuilder: ((items: Items) => Items)[]): Promise<T>;
    ReadAll(...composeBuilder: ((items: Items) => Items)[]): Promise<T[]>;
    protected loadItem(item: Item): T;
    protected createItem(item: T): TypedHash<any>;
    protected ReadByCamlQuery(viewXml: string): Promise<T[]>;
    protected ReadByCamlQueryCaml(caml: string, rowLimit?: number): Promise<T[]>;
    protected GetFormatedDateString(dtm: Date): string;
    protected BuildViewFieldsString(): string;
    private UseCompose;
    private EnsureFolder;
    private CheckFolder;
    protected SetUserField(obj: TypedHash<any>, userField: string, id: number): void;
    protected SetUsersField(obj: TypedHash<any>, userField: string, ids: number[]): void;
    protected GetPrincipalInfos(users: any[]): IPrincipalInfo[];
    protected GetPrincipalInfo(user: any): IPrincipalInfo;
}
//# sourceMappingURL=EntityRepositoryBase.d.ts.map