import QueryBuilder from "../../Query/QueryBuilder";
import AdapterConnection from "./AdapterConnection";




export default class MongoDbAdapterConnection implements AdapterConnection {
    
    public create(): void {
        console.log('create');
    }

    public query(): QueryBuilder {
        console.log('query');
        return new QueryBuilder('mysql'); // ! fun for now
    }
}

