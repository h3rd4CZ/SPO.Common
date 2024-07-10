
import { EntityBase } from '../Entities/EntityBase';
import { Items, ItemAddResult, ItemUpdateResult } from '@pnp/sp';

export interface IEntityRepositoryBase<T extends EntityBase>
{
    ReadAll(...composeBuilder : ((items : Items) => Items)[]) : Promise<T[]>;
    ReadById(id: number, ...composeBuilder : ((items : Items) => Items)[]) : Promise<T>;
    Update(entity : T) : Promise<ItemUpdateResult>;
    Create(entity : T, folder ?: string) : Promise<ItemAddResult>;
    Delete(id : number) : void;
}