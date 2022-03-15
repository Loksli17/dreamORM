import MysqlQueryBuilderAdapter from "./MysqlQueryBuilderAdapter";
import MongoQueryBuilderAdapter from "./MongoQueryBuilderAdapter";

import QueryExecutor        from "../queryExecutor/QueryExecutor";
import MysqlQueryExecutor   from "../queryExecutor/MysqlQueryExecutor";
import MongoDbQueryExecutor from "../queryExecutor/MongoDbQueryExecutor";



export abstract class QueryBuilderAdapterFactory {

    private static adapterAssociates: Record<string, any> = {
        mysql  : (queryExecutor: QueryExecutor) => { return new MysqlQueryBuilderAdapter(queryExecutor as MysqlQueryExecutor) },
        mongoDb: (queryExecutor: QueryExecutor) => { return new MongoQueryBuilderAdapter(queryExecutor as MongoDbQueryExecutor)}
    };

    public static create(adapterName: 'mysql' | 'mongoDb', queryExecutor: QueryExecutor): QueryBuilderAdapter {
        return QueryBuilderAdapterFactory.adapterAssociates[adapterName](queryExecutor);
    }
}   



export default interface QueryBuilderAdapter {

    createDb(): void;

    table(name: string): void; // !work name

    getFieldInfo(): Promise<Array<Record<string, any>>> // ! think about returned type

    getTableNames(): Promise<Array<string>>
}