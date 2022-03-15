import MongoDbQueryExecutor         from "../queryExecutor/MongoDbQueryExecutor";
import QueryBuilderAdapter          from "./QueryBuilderAdapter";
import { Collection, Db, Document, CollectionInfo } from "mongodb";


export default class MongoQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryExecutor: MongoDbQueryExecutor;

    
    constructor(queryExecutor: MongoDbQueryExecutor){
        this.queryExecutor = queryExecutor;
    }
    

    createDb(): void {
        console.log("Method not implemented.");
    }


    table(name: string): void {
        console.log("Method not implemented.");
    }


    getFieldInfo(): Promise<Record<string, any>[]> {
        throw new Error("Method not implemented.");
    }


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

}