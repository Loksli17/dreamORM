import MongoDbQueryExecutor from "../queryExecutor/MongoDbQueryExecutor";
import QueryBuilderAdapter  from "./QueryBuilderAdapter";


export default class MongoQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryData    : Record<string, any> = {};
    private queryExecutor: MongoDbQueryExecutor;


    constructor(qeuryExecutor: MongoDbQueryExecutor){
        this.queryExecutor = qeuryExecutor;
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


    getTableNames(): Promise<string[]> {
        throw new Error("Method not implemented.");
    } 

}