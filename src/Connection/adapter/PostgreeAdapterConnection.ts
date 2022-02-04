import QueryBuilder from "../../Query/QueryBuilder";
import PostgreeQueryExecutor from "../../Query/queryExecutor/PostreeQueryExecutor";
import QueryExecutor from "../../Query/queryExecutor/QueryExecutor";
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

