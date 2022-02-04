import MysqlQueryBuilderAdapter from "./MysqlQueryBuilderAdapter";
import Connection               from "../../Connection/Connection";
import QueryExecutor            from "../../Connection/queryExecutor/QueryExecutor";



export abstract class QueryBuilderAdapterFactory {

    private static adapterAssociates: Record<string, any> = {
        mysql: () => { return new MysqlQueryBuilderAdapter() }
    };

    public static create(adapterName: 'mysql', queryExecutor: QueryExecutor): QueryBuilderAdapter {
        return QueryBuilderAdapterFactory.adapterAssociates[adapterName]();
    }
}   



export default interface QueryBuilderAdapter {

    createDb(): void;

    table(name: string): void; // !work name

    getFieldNames(): Array<string> // !work name
}