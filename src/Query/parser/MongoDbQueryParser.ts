import { QueryData } from "../QueryBuilder";
import { Collection, Db, Document, CollectionInfo, WithId, FindCursor } from "mongodb";
import { MongoCollectionDocument } from "../adapter/MongoQueryBuilderAdapter";


export class MongoDbQueryParser {

    
    public parseFindAllCursor(findCursor: FindCursor<WithId<Document>>, queryData: QueryData): FindCursor<WithId<Document>> {

        if(queryData.limit != undefined){
           findCursor = findCursor.limit(queryData.limit);
        }

        if(queryData.offset != undefined) {
            findCursor = findCursor.skip(queryData.offset);
        }

        if(queryData.fields != undefined) {

            let projection: Record<string, 1 | 0> = {};

            if(!queryData.fields.includes('_id')){
                projection['_id'] = 0;
            }

            queryData.fields.forEach((field: string) => {
                projection[field] = 1; 
            });

            findCursor.project(projection);
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