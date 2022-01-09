import mysql2, { Pool as mPool } from 'mysql2';
import { Pool as pPool }         from 'pg';


/**
 * ! postgre has same options
 */
interface ConnectionOptions {
    dbName   : string;
    password?: string;
    user?    : string;
    port?    : number;
    host?    : number;
}


export default class Connection {

    //? class for connection item? and Big class for connection module (think about patterns) 
    private connections: Array<Record<string, any>> = [];
}