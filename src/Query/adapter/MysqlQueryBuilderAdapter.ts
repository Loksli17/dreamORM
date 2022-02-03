import mysql2              from 'mysql2';
import QueryBuilderAdapter from './QueryBuilderAdapter';


export default class MysqlQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryData: Record<string, any> = {}; 


    public table(name: string): void {
        this.queryData.tableName = name;
    }


    public getFieldNames(): Array<string> {
        return [];
    }

    /**
     * create database dreamorm;
     */
    public createDb(): void {

    }
    
}