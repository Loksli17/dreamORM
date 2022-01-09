import { Pool } from 'pg';


export default class PostgreesqlAdapter {

    public pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
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

    public createDatabase() {
        // pg.
    }

    
    public createTable() {
        
    }
}