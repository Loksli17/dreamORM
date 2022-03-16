import { Pool }            from 'pg';
import QueryBuilderAdapter from './QueryBuilderAdapter';


export default class PostgreesqlQueryBuilderAdapter implements QueryBuilderAdapter {

    
    public pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    getFieldInfo(): Promise<Record<string, any>[]> {
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

    public table(name: string): void {
        console.log(name);
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

    
    public createTable() {
        
    }
}