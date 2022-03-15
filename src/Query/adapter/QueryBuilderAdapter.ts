import MysqlQueryBuilderAdapter from "./MysqlQueryBuilderAdapter";
import Connection               from "../../Connection/Connection";
import QueryExecutor            from "../queryExecutor/QueryExecutor";
import MysqlQueryExecutor       from "../queryExecutor/MysqlQueryExecutor";



export abstract class QueryBuilderAdapterFactory {

    private static adapterAssociates: Record<string, any> = {
        mysql: (queryExecutor: QueryExecutor) => { return new MysqlQueryBuilderAdapter(queryExecutor as MysqlQueryExecutor) }
    };

    public static create(adapterName: 'mysql', queryExecutor: QueryExecutor): QueryBuilderAdapter {
        return QueryBuilderAdapterFactory.adapterAssociates[adapterName](queryExecutor);
    }
}   



export default interface QueryBuilderAdapter {

    createDb(): void;

    table(name: string): void; // !work name

    getFieldInfo(): Promise<Array<Record<string, any>>> // ! think about returned type

    getTableNames(): Promise<Array<string>>
}