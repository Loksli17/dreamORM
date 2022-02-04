import QueryBuilder         from "../../Query/QueryBuilder";
import MongoDbQueryExecutor from "../queryExecutor/MongoDbQueryExecutor";
import QueryExecutor from "../queryExecutor/QueryExecutor";
import AdapterConnection    from "./AdapterConnection";




export default class MongoDbAdapterConnection implements AdapterConnection {

    private queryExecutor_: MongoDbQueryExecutor = new MongoDbQueryExecutor();
    
    public create(): void {
        console.log('create');
    }

    public get queryExecutor(): QueryExecutor {
        return this.queryExecutor_;
    }
}

