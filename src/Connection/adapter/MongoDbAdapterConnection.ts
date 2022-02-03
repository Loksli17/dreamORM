import QueryBuilder from "../../Query/Query";
import AdapterConnection from "./AdapterConnection";


export default class MongoDbAdapterConnection implements AdapterConnection {
    
    public create(): void {
        console.log('create');
    }

    public query(): QueryBuilder {
        console.log('query');
        return new QueryBuilder();
    }
}

