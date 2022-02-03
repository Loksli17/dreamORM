import QueryBuilder from "../../Query/Query";
import AdapterConnection from "./AdapterConnection";

/**
 * node-postgres has special props:
 *      - credentials
 *      - region
 *       
 */

export default class PostgreeAdapterConnection implements AdapterConnection{
    
    public create(): void {
        console.log('create');
    }

    public query(): QueryBuilder {
        console.log('query');
        return new QueryBuilder();
    }
}

