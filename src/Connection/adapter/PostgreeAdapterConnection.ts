import QueryBuilder from "../../Query/QueryBuilder";
import PostgreeQueryExecutor from "../queryExecutor/PostreeQueryExecutor";
import QueryExecutor from "../queryExecutor/QueryExecutor";
import AdapterConnection from "./AdapterConnection";

/**
 * node-postgres has special props:
 *      - credentials
 *      - region
 *       
 */

export default class PostgreeAdapterConnection implements AdapterConnection {

    private queryExecutor_: QueryExecutor = new PostgreeQueryExecutor();

    public get queryExecutor(): QueryExecutor {
        return this.queryExecutor_;
    }
    
    public create(): void {
        console.log('create');
    }
}

