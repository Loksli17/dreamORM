import MysqlQueryBuilderAdapter from "./MysqlQueryBuilderAdapter";



export abstract class QueryBuilderAdapterFactory {

    private static adapterAssociates: Record<string, any> = {
        mysql: () => { return new MysqlQueryBuilderAdapter() }
    };

    public static create(adapterName: 'mysql'): QueryBuilderAdapter {
        return QueryBuilderAdapterFactory.adapterAssociates[adapterName]();
    }
}   



export default interface QueryBuilderAdapter {

    createDb(): void;

    table(name: string): QueryBuilderAdapter; // !work name
}