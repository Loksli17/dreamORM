import { Collection, Db, Document, CollectionInfo, WithId, FindCursor } from "mongodb";

import { QueryData }               from "../QueryBuilder";
import { MongoCollectionDocument } from "../adapter/MongoQueryBuilderAdapter";
import MongoDbWhereParser          from "../whereBuilder/MongoDbWhereParser";
import WhereBuilder                from "../whereBuilder/WhereBuilder";


export class MongoDbQueryParser {

    private queryData  : QueryData = {};
    private findCursor!: FindCursor<WithId<Document>>;


    private parseOrderBy(): void {
        
        let sortObject: {[index: string]: -1 | 1} = {};

        if(Array.isArray(this.queryData.sort)) {
            sortObject[this.queryData.sort[0]] = (this.queryData.sort[1] == 'asc') ? 1 : -1;
        } else {
            sortObject[this.queryData.sort!.column] = (this.queryData.sort!.order == 'asc') ? 1 : -1;
        }

        this.findCursor.sort(sortObject);
    }


    private parseLimit(): void {
        this.findCursor.limit(this.queryData.limit!);
    }


    private parseSkip(): void {
        this.findCursor.skip(this.queryData.limit!);
    }

    
    private parseColumns(): void {
        let projection: Record<string, 1 | 0> = {};

        if(!this.queryData.fields!.includes('_id')) {
            projection['_id'] = 0;
        }

        this.queryData.fields!.forEach((field: string) => {
            projection[field] = 1; 
        });

        this.findCursor.project(projection);
    }


    //? refactor this code [where]
    private parseWhere(): void {

        const params: WhereBuilder | Record<string, any> = this.queryData.where as WhereBuilder | Record<string, any>;
        let builder: WhereBuilder;

        if(params instanceof WhereBuilder) {
            //* WhereBuilder ..
            builder = params;

            let query: Record<string, any> = new MongoDbWhereParser().parse(builder.data) as Record<string, any>;

            console.log(query);

            this.findCursor.addQueryModifier('$query', query);

        } else {
            //* simple object ..

        }

    }

    
    public parseFindAllCursor(findCursor: FindCursor<WithId<Document>>, queryData: QueryData): FindCursor<WithId<Document>> {

        this.queryData  = queryData;
        this.findCursor = findCursor;

        if(queryData.limit != undefined) {
           this.parseLimit();
        }

        if(queryData.offset != undefined) {
            this.parseSkip();
        }

        if(queryData.fields != undefined) {
            this.parseColumns();
        }

        if(queryData.where != undefined) {
            this.parseWhere();
        }

        if(queryData.sort != undefined) {
            this.parseOrderBy();
        }

        this.queryData = {};

        return findCursor;
    }


    //*this method is not work!!!
    public parseFindOneCursor(findCursor: FindCursor<WithId<Document>>, queryData: QueryData): FindCursor<WithId<Document>> {

        this.queryData = queryData;
        this.findCursor = findCursor;

        if(queryData.limit != undefined) {
           this.parseLimit();
        }

        if(queryData.fields != undefined) {
            this.parseColumns();
        }

        if(queryData.where != undefined) {
            this.parseWhere();
        }

        this.queryData = {};

        return findCursor;
    }

    
    public parseDocumentToNamesArray(collectionDocument: WithId<Document>): Array<MongoCollectionDocument> {

        let result: Array<MongoCollectionDocument> = [];

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

        return result;
    }


    //? refactor this code [where]
    public parseDeleteFilter(queryData: QueryData): Record<string, any>{

        const params: WhereBuilder | Record<string, any> = queryData.where as WhereBuilder | Record<string, any>;
        let builder: WhereBuilder;

        if(params instanceof WhereBuilder) {
            //* WhereBuilder ..
            builder = params;

            let query: Record<string, any> = new MongoDbWhereParser().parse(builder.data) as Record<string, any>;

            return query;

        } else {
            //* simple object ..

            return {};
        }

    }
}