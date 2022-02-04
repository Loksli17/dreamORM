import QueryExecutor from "./QueryExecutor";


export default class MongoDbQueryExecutor implements QueryExecutor {

    public query(queryParams: string | Record<string, any>) {
        console.log(queryParams);   
    }
}