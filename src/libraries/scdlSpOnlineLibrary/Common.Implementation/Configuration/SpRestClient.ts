
import { SPHttpClient } from '@microsoft/sp-http'
import { sp } from '@pnp/sp';
import { TypedHash } from '@pnp/common';
export class SpRestClient
{
    constructor(private currWeb : string) {

        if(!('fetch' in window)) throw new Error("Browser does not support fetch");
    }

    public async CreateListItemInFolder(listTitle : string, folderPath : string, props : {}) : Promise<number>{

        let digest : string = await this.GetDigest()

        var itemProps : Array<object> = [];

        Object.keys(props).forEach((v, i, a) => {
            itemProps.push({FieldName : v, FieldValue : props[v]});
        });

        let folderResponse  = await fetch(
            `${this.currWeb}/_api/web/Lists/GetByTitle('${listTitle}')/AddValidateUpdateItemUsingPath`,
             {
             method:'POST',
             headers : {
                        'Accept': 'application/json;odata=verbose',
                        'Content-type': 'application/json;odata=verbose',
                        'odata-version': '',
                        'X-RequestDigest': `${digest}`
                            } ,
            body:JSON.stringify({
                "listItemCreateInfo": {
                    "FolderPath":  { "DecodedUrl": `${folderPath}` },
                    "UnderlyingObjectType": 0
                },
                "formValues": itemProps,
                "bNewDocumentUpdate": false
                                })

            });

            if(folderResponse.status !== 200 ) throw new Error(folderResponse.statusText);


            let folderJson = await folderResponse.json();
            let resId = folderJson.d.AddValidateUpdateItemUsingPath.results.filter(r => r.FieldName === "Id");

            if(!resId || resId.length === 0 ) throw new Error("Id of resulted object was not found");

            return parseInt(resId[0].FieldValue);
    }

    private async GetListItemEntityType() : Promise<string>{

        let etRes = await fetch(
            `${this.currWeb}/_api/web/Lists/GetByTitle('Test')?$select=ListItemEntityTypeFullName`,
             {
             method:'GET',
             headers : {
                        'Accept': 'application/json;odata=verbose'
                       }
            });

            let etJson =  await etRes.json();

            return etJson.ListItemEntityTypeFullName;
    }

    private async GetDigest() : Promise<string>{

        let digestJson = await fetch(`${this.currWeb}/_api/contextinfo`, {
            method: 'POST',
            headers: {
              accept: 'application/json;odata=nometadata'
            }
          });

        let digestResponse : any = await digestJson.json();

        let digest = digestResponse.FormDigestValue;

        return digest;
    }
}