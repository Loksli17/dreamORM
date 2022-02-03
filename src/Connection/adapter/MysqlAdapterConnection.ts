// import mysql2, { Pool, PoolCluster, Connection, PoolClusterOptions } from 'mysql2';

import * as mysql from 'mysql2/promise';
import { BasicConnectionAttributes } from '../Connection';
import AdapterConnection from './AdapterConnection';



export default class MysqlAdapterConnection implements AdapterConnection {

    private pool_!      : mysql.Pool;
    private connection_!: Promise<mysql.Connection>;
    private cluster_!   : mysql.PoolCluster;

    private connectionType: 'connection' | 'pool' | 'cluster' = 'pool';


    private connectionTypesAssciations: Record<string, (params: BasicConnectionAttributes) => void> = {
        pool      : params => this.createPool(params),
        connection: params => this.createConnection(params),
        cluster   : params => this.createPoolCluster(params),
    }


    public create(params: BasicConnectionAttributes): void {
        if(params.type) this.connectionType = params.type;
        this.connectionTypesAssciations[this.connectionType](params);
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


    private createConnection(params: BasicConnectionAttributes): Promise<mysql.Connection> {

        const connection: Promise<mysql.Connection> = mysql.createConnection({
            database: params.dbName,
            user    : params.user,
            password: params.password,
            port    : params.port,
            host    : params.host,
        });

        return connection;
    }

    
    private createPoolCluster(params: BasicConnectionAttributes): mysql.PoolCluster {
        return mysql.createPoolCluster();
    }
}
