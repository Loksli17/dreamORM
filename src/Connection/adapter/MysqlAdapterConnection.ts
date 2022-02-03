// import mysql2, { Pool, PoolCluster, Connection, PoolClusterOptions } from 'mysql2';

import * as mysql from 'mysql2/promise';
import { BasicConnectionAttributes } from '../Connection';
import AdapterConnection from './AdapterConnection';


export default class MysqlAdapterConnection implements AdapterConnection {

    private pool_!      : mysql.Pool;
    private connection_!: mysql.Connection;
    private cluster_!   : mysql.PoolCluster;


    public create(params: BasicConnectionAttributes): void {
        
        this.pool_ = this.createPool(params);
    }

    public query(...args: any[]): void {

        this.pool_.execute(args[0] as string).then((value: any) => {
            console.log(value);
        });
    }


    private createPool(params: BasicConnectionAttributes): mysql.Pool{

        const pool: mysql.Pool = mysql.createPool({
            database: params.dbName,
            user    : params.user,
            password: params.password,
            port    : params.port,
            host    : params.host,
        });

        return pool;
    }
}
