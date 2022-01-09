import mysql2, { Pool, PoolCluster, Connection} from 'mysql2';

const pool: Pool = mysql2.createPool({
    database: 'vueLearn',
    user    : 'root',
    password: '1234',
    port    : 3306,
    host    : '127.0.0.1',
});

const connection: Connection = mysql2.createConnection({
    database: 'vueLearn',
    user    : 'root',
    password: '1234',
    port    : 3306,
    host    : '127.0.0.1',
});

const poolCluster: PoolCluster = mysql2.createPoolCluster();

// const poolCluster: Pool = mysql2.createPoolCluster({
//     database: 'hairs',
//     user    : 'root',
//     password: '1234',
//     port    : 3306,
//     host    : '127.0.0.1',
// });


interface AdapterConnection {

    create(): void;
}


export default class MysqlAdapterConnection implements AdapterConnection {

    public create(): void {
        
    }
}
