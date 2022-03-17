import { QueryData } from "../QueryBuilder";
import { Collection, Db, Document, CollectionInfo, WithId, FindCursor } from "mongodb";


export class MongoDbQueryParser {

  
    public parseFindAllCursor(findCursor: FindCursor<WithId<Document>>, queryData: QueryData){

        if(queryData.limit != undefined){
           findCursor = findCursor.limit(queryData.limit);
        }

        if(queryData.offset != undefined) {
            findCursor = findCursor.skip(queryData.offset);
        }

        return findCursor;
    }
}