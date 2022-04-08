import { Document, CollectionInfo, WithId, FindCursor } from "mongodb";

import MongoDbQueryExecutor   from "../queryExecutor/MongoDbQueryExecutor";
import QueryBuilderAdapter    from "./QueryBuilderAdapter";
import { QueryData }          from '../QueryBuilder';
import { MongoDbQueryParser } from "../parser/MongoDbQueryParser";
import Entity from "../../Entity/Entity";



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

    public async removeById(queryData: QueryData): Promise<any> {
        const filter: Record<string, any> = await this.queryParser.parseDeleteFilter(queryData);
        console.log('filter', filter);
        return this.queryExecutor.removeOne(queryData, filter);
    }

    public async remove(queryData: QueryData): Promise<any> {
        const filter: Record<string, any> = await this.queryParser.parseDeleteFilter(queryData);
        console.log('filter', filter);
        return this.queryExecutor.remove(queryData, filter);
    }


    createDb(): void {
        console.log("Method not implemented.");
    }

    insertOne(queryData: QueryData, obj: Record<string, any> | Entity): Promise<any> {
        throw new Error("Method not implemented.");
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
        return await findCursor.toArray();
    }


    //* end point method
    //! refactor this method with queryExecutor.findOne()!!
    public async findOne(queryData: QueryData): Promise<Record<string, any>> {
        let findCursor: FindCursor<WithId<Document>> = await this.queryExecutor.findAll(queryData);
        this.queryParser.parseFindOneCursor(findCursor, queryData);
        return await findCursor.toArray();
    }

}