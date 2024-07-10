import { SpRepositoryBase } from './SpRepositoryBase';
import { IEntityRepositoryBase } from './IEntityRepositoryBase';

import { EntityBase } from '../Entities/EntityBase';
import { Web, List, Item, Items, CamlQuery, ItemUpdateResult, ItemAddResult, Folder, sp } from '@pnp/sp';
import { TypedHash } from '@pnp/common';
import { SpRestClient } from '../../Common.Implementation/Configuration/SpRestClient';
import { IPrincipalInfo } from '../../Common/Security/IPrincipalInfo';
import { GroupInfo } from '../../Common/Security/GroupInfo';
import { UserInfo } from '../../Common/Security/UserInfo';
import { SectionDesignation } from '../../Common/Security/SectionDesignation';

export abstract class EntityRepositoryBase<T extends EntityBase> extends SpRepositoryBase implements IEntityRepositoryBase<T>
{
     protected Selects() : string[]{
        return ["Id", "Title", "Author/Id", "Author/UserName", "Author/FirstName", "Author/LastName", "Author/EMail"];
     }

     protected Expands() : string[]{
         return ["Author"];
     }

    constructor(private entityType : new () => T,  listResolver : (web : Web) => List, web : Web) {
        super(listResolver, web);
    }

    protected createEntityType() : T{
            return new this.entityType();
    }

    public async Create(entity: T, folder ?: string): Promise<ItemAddResult> {
        return await super.UseList(async list => {

            var createPayload = this.createItem(entity);

            if(folder)
            {
                let web = await this._web.get();
                let restClient = new SpRestClient(web.Url);

                var fldr = await this.EnsureFolder(folder, list, restClient);

                let l = await list.select("Title").get();
                let listTitle = l.Title;

                await restClient.CreateListItemInFolder(listTitle, fldr.ServerRelativeUrl, createPayload);

            }
            else
            {
                return await list.items.add(createPayload);
            }
        });
    }

    public Update(entity: T): Promise<ItemUpdateResult> {
        return super.UseList(async list => {
            var updatePayload = this.createItem(entity);
            return await list.items.getById(entity.Id).update(updatePayload);
        });
    }

    public Delete(id: number): Promise<void> {
        return super.UseList(async list => {
            var itm = await list.items.getById(id).delete();
        });
    }

    public ReadById(id: number, ...composeBuilder: ((items: Items) => Items)[]): Promise<T> {
        return super.UseList(async list => {
            var items = list.items
            .select(...this.Selects())
            .expand(...this.Expands());

            if(composeBuilder && composeBuilder.length > 0)
            {
                items = this.UseCompose(items, composeBuilder);
            }
            var result = await items.getById(id)
            .select(...this.Selects())
            .expand(...this.Expands())
            .get() as Item;
            return this.loadItem(result);
        });
    }

    public ReadAll(...composeBuilder : ((items : Items) => Items)[]) : Promise<T[]>{
        return super.UseList(async list => {
            var items = list.items
            .select(...this.Selects())
            .expand(...this.Expands());

            if(composeBuilder && composeBuilder.length > 0)
            {
                items = this.UseCompose(items, composeBuilder);
            }

            var result = await items.get() as Item[];

            return result.map((v, i, a)=> this.loadItem(v));
        });
    }

    protected loadItem(item : Item) : T {

        var e = this.createEntityType();
        e.Id = item["Id"];
        e.Title = item["Title"];
        e.Author = this.GetPrincipalInfo(item["Author"]);

        return e;
    }

    protected createItem(item : T) : TypedHash<any> {

        return {
            Title : item.Title
        };
    }

    protected ReadByCamlQuery(viewXml: string): Promise<T[]> {
        return super.UseList(async list => {
                const query: CamlQuery = {
                    ViewXml: viewXml
                };

            var result = await list.getItemsByCAMLQuery(query) as Item[];

            return result.map((v, i, a)=>this.loadItem(v));
        });
    }

    protected ReadByCamlQueryCaml(caml: string, rowLimit ?: number): Promise<T[]> {

        let viewXml =
            `<View><ViewFields>${this.BuildViewFieldsString()}</ViewFields><Query>${caml}<OrderBy><FieldRef Name='Title' /></OrderBy></Query><RowLimit>${rowLimit ? rowLimit : Number.MAX_VALUE}</RowLimit></View>`;

        return super.UseList(async list => {
                const query: CamlQuery = {
                    ViewXml: viewXml
                };

            var result = await list.getItemsByCAMLQuery(query) as Item[];

            return result.map((v, i, a)=>this.loadItem(v));
        });
    }

    protected GetFormatedDateString(dtm : Date) : string{
        return `${dtm.getMonth() + 1}/${dtm.getDate()}/${dtm.getFullYear()} ${dtm.getHours()}:${dtm.getMinutes()}:${dtm.getSeconds()}`;

    }

    protected BuildViewFieldsString() : string{

        var selectFields = this.Selects();
        var viewFields : string[] = selectFields.map((v, i, a) => `<FieldRef Name='${v}' />`);

        var viewFieldsString : string = viewFields.join("");

        return viewFieldsString;
    }

    private UseCompose(items : Items, composeBuilder : ((items : Items) => Items)[]) :Items{

        var newItems = items;

        composeBuilder.forEach(element => {
            newItems = element(newItems);
        });

        return newItems;
    }

    private async EnsureFolder(folderStructure : string, list : List, spRestClient : SpRestClient) : Promise<any>
    {

        let l = await list.select("Title").get();
        let listTitle = l.Title;

        let folderParts = folderStructure.split("/");

        let currFldr : any = await list.rootFolder.select("ServerRelativeUrl").get();

        for(let i = 0; i < folderParts.length; i++)
        {
            let v = folderParts[i];

            let currFldrUrl = currFldr.ServerRelativeUrl;

            let exist = await this.CheckFolder(currFldrUrl + "/" + v, this._web);

            if(!exist)
            {
                let folderItemId = await spRestClient.CreateListItemInFolder(listTitle, currFldrUrl , {
                    ContentTypeId: '0x0120',
                    FileLeafRef: v,
                    Title : v
                });

                await list.items.getById(folderItemId).update({ Title : v, FileLeafRef : v });

                currFldr = await this._web.getFolderByServerRelativePath(currFldr.ServerRelativeUrl + "/" + v).get();
            }
            else
            {
                currFldr = exist;
            }
        }

       return currFldr;
    }

    private async CheckFolder(folderUrl : string, web : Web) : Promise<any>{
        try
        {
            let folder = await  web.getFolderByServerRelativeUrl(folderUrl).get();
            return folder;
        }
        catch{
            return undefined;
        }
    }

    protected SetUserField(obj : TypedHash<any>, userField  : string, id : number )
    {
        obj[`${userField}Id`] = id;
    }

    protected SetUsersField(obj : TypedHash<any>, userField  : string, ids : number[] )
    {
        obj[`${userField}Id`] = { results : ids };
    }

    protected GetPrincipalInfos(users : any[]) : IPrincipalInfo[]
    {
         return users.map((v, i, a) => this.GetPrincipalInfo(v));
    }

    protected GetPrincipalInfo(user : any) : IPrincipalInfo
    {

        if(Object.keys(user).indexOf("Id") === -1)
             throw new Error("User object doesnot have Id property expanded, please include Id as expanded property");

        if(Object.keys(user).indexOf("UserName") === -1)
             throw new Error("User object doesnot have UserName property expanded, there is no way how to check if it is user or group, please include UserName as expanded property");

             let isGroup = !user.UserName;

             let sd : SectionDesignation = new SectionDesignation(this._webUrl);

             return isGroup ?
                new GroupInfo(user.Id, user.Name, "") :
                new UserInfo(sd, user.Id, user.UserName, user.FirstName && user.LastName ? `${user.FirstName} ${user.LastName}` : "", user.EMail );
    }
}