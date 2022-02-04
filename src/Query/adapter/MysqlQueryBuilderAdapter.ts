import mysql2              from 'mysql2';
import AdapterConnection from '../../Connection/adapter/AdapterConnection';
import MysqlAdapterConnection from '../../Connection/adapter/MysqlAdapterConnection';
import Connection from '../../Connection/Connection';
import MysqlQueryExecutor from '../../Connection/queryExecutor/MysqlQueryExecutor';
import QueryBuilderAdapter from './QueryBuilderAdapter';


export default class MysqlQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryData    : Record<string, any> = {};
    private queryExecutor: MysqlQueryExecutor; 

    constructor(queryExecutor: MysqlQueryExecutor){
        this.queryExecutor = queryExecutor;
    }


    private clearQueryData(): void {
        this.queryData = {};
    }


    public table(name: string): void {
        this.queryData.tableName = name;
    }

    //* end point method
    //! add different arguments this method is not simple
    public async getFieldNames(): Promise<Array<string>> {
        let qeuryString: string = `show columns from ${this.queryData.table}`;
        this.clearQueryData();
        return [];
    }


    //* end point method
    public async getTableNames(): Promise<Array<string>> {
        let 
            result     : Array<string> = [],
            queryString: string        = `show tables`,
            queryResult: Array<any>    = await this.queryExecutor.query(queryString);

        queryResult[0].forEach((item: Record<string, string>) => {
            for (let key in item){
                result.push(item[key]);
            }
        });

        this.clearQueryData();
        return result;
    }


    /**
     * create database dreamorm;
     */
    public createDb(): void {

    }
    
}