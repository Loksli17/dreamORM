import { QueryData } from "../QueryBuilder";
import { Db }          from "mongodb";


export class MongoDbQueryParser {

    private queryData: QueryData = {};
    private db       : Promise<Db>;


    constructor(db: Promise<Db>){
        this.db = db;
    }


    public async parseFindOne(queryData: QueryData){
        
        this.queryData = queryData;

        // return await (await this.db).collection(this.queryData.tableName!).;
    }
}