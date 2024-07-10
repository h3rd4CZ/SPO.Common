import { sp, Web, List } from '@pnp/sp';

export class SpRepositoryBase
{
    private _listResolver : (web : Web) => List;
    protected _web : Web;
    protected _webUrl : string;

    constructor( listResolver : (web : Web) => List, web : Web) {
        this._listResolver = listResolver;
        this._web = web;
        this.setUrl();
    }

    private async setUrl() : Promise<void>
    {
        let web = await this._web.get();
        this._webUrl  =web.Url;
    }

    protected UseList<T>(lambda : (list : List) => T) : T
    {
        var resolvedList =  this.ResolveList();

        return lambda(resolvedList);
    }

    private ResolveList() : List{

        return this._listResolver(this._web);

    }
}