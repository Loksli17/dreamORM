import mysql2              from 'mysql2';
import AdapterConnection from '../../Connection/adapter/AdapterConnection';
import MysqlAdapterConnection from '../../Connection/adapter/MysqlAdapterConnection';
import Connection from '../../Connection/Connection';
import QueryBuilderAdapter from './QueryBuilderAdapter';


export default class MysqlQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryData: Record<string, any> = {};

    private clearQueryData(): void {
        this.queryData = {};
    }


    public table(name: string): void {
        this.queryData.tableName = name;
    }

    //* end point method
    public getFieldNames(): Array<string> {
        let qeuryString: string = `show columns from ${this.queryData.table}`;
        this.clearQueryData();
        return [];
    }

    //* end point method
    //! add different arguments this method is not simple
    public getTableNames(): Array<string> {
        let qeuryString: string = `show tables`;
        this.clearQueryData();
        return [];
    }


    /**
     * create database dreamorm;
     */
    public createDb(): void {

    }
    
}