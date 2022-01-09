import mysql2, { Pool as mPool } from 'mysql2';
import { Pool as pPool }         from 'pg';


const pool1: mPool = mysql2.createPool({
    database: 'vueLearn',
    user    : 'root',
    password: '1234',
    port    : 3306,
    host    : '127.0.0.1',
});

pool1.execute('select * from `user` limit 3', (sql: string, values: any) => {
    console.log('users [vueLearn]:', values);
});


const pool2: mPool = mysql2.createPool({
    database: 'hairs',
    user    : 'root',
    password: '1234',
    port    : 3306,
    host    : '127.0.0.1',
});

pool2.execute('select * from `example` limit 3', (sql: string, values: any) => {
    console.log('examples [hairs]:', values);
});

// const pool3: pPool = new pPool({
//     database: 'hairs',
//     user    : 'root',
//     password: '1234',
//     port    : 3306,
//     host    : '127.0.0.1',
// });

// pool3.query('select * from `user`').then((value: any) => {
//     console.log(value);
// });

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
    private connections: Array<Record<string, any>> = [pool1, pool2];
}