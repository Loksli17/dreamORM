import MongoDbQueryExecutor         from "../queryExecutor/MongoDbQueryExecutor";
import QueryBuilderAdapter          from "./QueryBuilderAdapter";
import { Collection, Db, Document, CollectionInfo, WithId } from "mongodb";



interface MongoCollectionDocument {
    type: string;
    name: string;
}



export default class MongoQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryData    : Record<string, any> = {};
    private queryExecutor: MongoDbQueryExecutor;

    
    constructor(queryExecutor: MongoDbQueryExecutor){
        this.queryExecutor = queryExecutor;
    }

    private clearQueryData(): void {
        this.queryData = {};
    }

    public table(name: string): void {
        this.queryData.tableName = name;
    }
    


    createDb(): void {
        console.log("Method not implemented.");
    }



    //* end point method
    public async getTableNames(): Promise<Array<string>> {
        
        const db: Db = (await this.queryExecutor.query());

        let
            queryResult = await db.listCollections().toArray(),
            result: Array<string> = [];

        queryResult.forEach((collection: CollectionInfo) => {
            result.push(collection.name);
        });

        return result;
    } 


    //* end point method
    public async getFieldInfo(): Promise<Array<MongoCollectionDocument>> {
        
        const db: Db = (await this.queryExecutor.query());

        let 
            result            : Array<MongoCollectionDocument> = [],
            collectionDocument: WithId<Document> | null = await db.collection(this.queryData.tableName).findOne();

        if(collectionDocument == undefined) {
            throw new Error(`Collection ${this.queryData.tableName} hasn't have any document. You should add document for getting Entity structure.`);
        }

        for (const field in collectionDocument) {
            if (Object.prototype.hasOwnProperty.call(collectionDocument, field)) {
                
                let
                    fieldData: any    = collectionDocument[field],
                    type     : string = typeof fieldData
                
                if(fieldData instanceof Date) type = "date";
                if(field == '_id') type = "string";
        
                result.push({
                    name: field,
                    type: type,
                });
            }
        }

        this.clearQueryData(); //? decorator

        return result;
    }

}