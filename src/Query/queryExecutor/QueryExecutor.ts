
export default interface QueryExecutor {

    query (queryParams: string | Record<string, any>): any;
}