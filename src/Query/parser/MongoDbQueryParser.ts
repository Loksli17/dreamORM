import { Collection, Db, Document, CollectionInfo, WithId, FindCursor } from "mongodb";

import { QueryData }               from "../QueryBuilder";
import { MongoCollectionDocument } from "../adapter/MongoQueryBuilderAdapter";
import MongoDbWhereParser          from "../whereBuilder/MongoDbWhereParser";
import WhereBuilder                from "../whereBuilder/WhereBuilder";


export class MongoDbQueryParser {

    private queryData  : QueryData = {};
    private findCursor!: FindCursor<WithId<Document>>;


    private parseLimit(): void {
        this.findCursor.limit(this.queryData.limit!);
    }

    private parseSkip(): void {
        this.findCursor.skip(this.queryData.limit!);
    }

    private parseColumns(): void {
        let projection: Record<string, 1 | 0> = {};

        if(!this.queryData.fields!.includes('_id')){
            projection['_id'] = 0;
        }

        this.queryData.fields!.forEach((field: string) => {
            projection[field] = 1; 
        });

        this.findCursor.project(projection);
    }

    private parseWhere(): void {

        const params: WhereBuilder | Record<string, any> = this.queryData.where as WhereBuilder | Record<string, any>;
        let builder: WhereBuilder;

        if(params instanceof WhereBuilder){
            //* WhereBuilder ..
            builder = params;

            const query: Record<string, any> = new MongoDbWhereParser().parse(builder.data) as Record<string, any>;
            this.findCursor.addQueryModifier('$query', query);

        } else {
            //* simple object ..
        }

    }

    
    public parseFindAllCursor(findCursor: FindCursor<WithId<Document>>, queryData: QueryData): FindCursor<WithId<Document>> {

        this.queryData  = queryData;
        this.findCursor = findCursor;

        if(queryData.limit != undefined){
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
}