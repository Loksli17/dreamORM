import mysql2              from 'mysql2';
import AdapterConnection from '../../Connection/adapter/AdapterConnection';
import MysqlAdapterConnection from '../../Connection/adapter/MysqlAdapterConnection';
import Connection from '../../Connection/Connection';
import QueryBuilderAdapter from './QueryBuilderAdapter';


export default class MysqlQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryData: Record<string, any> = {}; 


    public table(name: string): void {
        this.queryData.tableName = name;
    }

    //* end point method
    public getFieldNames(): Array<string> {
        return [];
    }

    /**
     * create database dreamorm;
     */
    public createDb(): void {

    }
    
}