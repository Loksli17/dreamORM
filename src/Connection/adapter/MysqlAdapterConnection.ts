import mysql2, { Pool, PoolCluster, Connection, PoolClusterOptions } from 'mysql2';
import AdapterConnection from './AdapterConnection';


const test = async () => {

    const pool: Pool = mysql2.createPool({
        database: 'vueLearn',
        user    : 'root',
        password: '1234',
        port    : 3306,
        host    : '127.0.0.1',
    });

    const promisePool = pool.promise();

    console.log(promisePool);

    promisePool.execute('select * from user').then((value: any) => {
        // console.log(value);
    });

    const connection: Connection = await mysql2.createConnection({
        database: 'vueLearn',
        user    : 'root',
        password: '1234',
        port    : 3306,
        host    : '127.0.0.1',
    });

    const promiseConnection = connection.promise();

    promiseConnection.execute('select * from article').then((value: any) => {
        // console.log(value);
    });

    const cluster = mysql2.createPoolCluster();
}

test();





export default class MysqlAdapterConnection implements AdapterConnection {

    public create(): void {
        
    }
}
