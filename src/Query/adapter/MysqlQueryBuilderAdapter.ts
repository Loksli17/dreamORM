import mysql2              from 'mysql2';
import QueryBuilderAdapter from './QueryBuilderAdapter';


export default class MysqlQueryBuilderAdapter implements QueryBuilderAdapter {

    public table(name: string): QueryBuilderAdapter {
        return this;
    }

    /**
     * create database dreamorm;
     */
    public createDb(): void {

    }
    
}