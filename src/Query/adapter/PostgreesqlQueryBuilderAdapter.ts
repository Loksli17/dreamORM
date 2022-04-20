import { Pool }            from 'pg';
import { QueryData } from '../QueryBuilder';
import WhereChain from '../whereBuilder/WhereBuilder';
import QueryBuilderAdapter from './QueryBuilderAdapter';
import Entity from '../../Entity';


export default class PostgreesqlQueryBuilderAdapter implements QueryBuilderAdapter {

    
    public pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    findOne(queryData: QueryData): Promise<Record<string, any>> {
        throw new Error('Method not implemented.');
    }

    remove(queryData: QueryData): Promise<any> {
        throw new Error('Method not implemented.');
    }

    removeById(queryData: QueryData): Promise<any> {
        throw new Error('Method not implemented.');
    }
    
    insertOne(queryData: QueryData, obj: Record<string, any> | Entity): Promise<any> {
        throw new Error('Method not implemented.');
    }

    getFieldsInfo(queryData: QueryData): Promise<Record<string, any>[]> {
        throw new Error('Method not implemented.');
    }
    
    getTableNames(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }

    //* end point method
    public async findAll(): Promise<Array<Record<string, any>>> {
        
        let result: Array<Record<string, any>> = [];

        return result;
    }
    
    /**
     * 
    CREATE DATABASE test
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
     */

    public createDb() {
        // pg.
    }

    
    public async createTableFromEntity(classname: typeof Entity): Promise<any> {
        
    }
}