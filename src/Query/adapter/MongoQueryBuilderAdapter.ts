import MongoDbQueryExecutor         from "../queryExecutor/MongoDbQueryExecutor";
import QueryBuilderAdapter          from "./QueryBuilderAdapter";
import { Collection, Db, Document, CollectionInfo, WithId, FindCursor } from "mongodb";

import { QueryData }          from '../QueryBuilder';
import { MongoDbQueryParser } from "../parser/MongoDbQueryParser";
import WhereChain from "../whereBuilder/WhereBuilder";



export interface MongoCollectionDocument {
    type: string;
    name: string;
}



export default class MongoQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryExecutor: MongoDbQueryExecutor;
    private queryParser  : MongoDbQueryParser;

    
    constructor(queryExecutor: MongoDbQueryExecutor){
        this.queryExecutor = queryExecutor;
        this.queryParser   = new MongoDbQueryParser();
    }

    
    createDb(): void {
        console.log("Method not implemented.");
    }



    //* end point method
    public async getTableNames(): Promise<Array<string>> {

        let
            queryResult = await this.queryExecutor.getCollectionsName(),
            result: Array<string> = [];

        queryResult.forEach((collection: CollectionInfo) => {
            result.push(collection.name);
        });

        return result;
    } 


    //* end point method
    public async getFieldsInfo(queryData: QueryData): Promise<Array<MongoCollectionDocument>> {

        let 
            result            : Array<MongoCollectionDocument> = [],
            collectionDocument: WithId<Document> | null = await this.queryExecutor.findOne(queryData);

        if(collectionDocument == undefined) {
            throw new Error(`Collection ${queryData.tableName} hasn't have any document. You should add document for getting Entity structure.`);
        }

        result = this.queryParser.parseDocumentToNamesArray(collectionDocument);

        return result;
    }


    //* end point method
    public async findAll(queryData: QueryData): Promise<Array<Record<string, any>>> {

        let findCursor: FindCursor<WithId<Document>> = await this.queryExecutor.findAll(queryData);
        
        this.queryParser.parseFindAllCursor(findCursor, queryData);
        
        return findCursor.toArray();
    }

}