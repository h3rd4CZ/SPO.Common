import { Web, List } from '@pnp/sp';
export declare class SpRepositoryBase {
    private _listResolver;
    protected _web: Web;
    protected _webUrl: string;
    constructor(listResolver: (web: Web) => List, web: Web);
    private setUrl;
    protected UseList<T>(lambda: (list: List) => T): T;
    private ResolveList;
}
//# sourceMappingURL=SpRepositoryBase.d.ts.map