import QueryBuilder from "../../Query/QueryBuilder";
import AdapterConnection from "./AdapterConnection";

/**
 * node-postgres has special props:
 *      - credentials
 *      - region
 *       
 */

export default class PostgreeAdapterConnection implements AdapterConnection {
    
    public create(): void {
        console.log('create');
    }

    public query(): QueryBuilder {
        console.log('query');
        return new QueryBuilder('mysql'); //! fun for a now 
    }
}

