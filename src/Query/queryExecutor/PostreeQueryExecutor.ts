import QueryExecutor from "./QueryExecutor";


export default class PostgreeQueryExecutor implements QueryExecutor {

    public query(queryParams: string | Record<string, any>) {
        console.log(queryParams);   
    }
}