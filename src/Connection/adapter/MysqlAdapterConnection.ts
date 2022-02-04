// import mysql2, { Pool, PoolCluster, Connection, PoolClusterOptions } from 'mysql2';

import * as mysql               from 'mysql2/promise';
import QueryBuilder             from '../../Query/QueryBuilder';
import { ConnectionAttributes } from '../Connection';
import MysqlQueryExecutor       from '../queryExecutor/MysqlQueryExecutor';
import QueryExecutor from '../queryExecutor/QueryExecutor';
import AdapterConnection        from './AdapterConnection';



export default class MysqlAdapterConnection implements AdapterConnection {

    private queryExecutor_!: MysqlQueryExecutor;

    private pool_!      : mysql.Pool;
    private connection_!: Promise<mysql.Connection>;
    private cluster_!   : mysql.PoolCluster;

    private connectionType: 'connection' | 'pool' | 'cluster' = 'pool';

    private connectionTypesAssociations: Record<string, (params: ConnectionAttributes) => mysql.Pool | Promise<mysql.Connection> | mysql.PoolCluster> = {
        pool      : params => this.createPool(params),
        connection: params => this.createConnection(params),
        cluster   : params => this.createPoolCluster(params),
    }

    public create(params: ConnectionAttributes): void {
        if(params.type) this.connectionType = params.type;
        
        const connector: mysql.Pool | Promise<mysql.Connection> | mysql.PoolCluster = this.connectionTypesAssociations[this.connectionType](params);
        this.queryExecutor_ = new MysqlQueryExecutor(this.connectionType, connector);
    }



    private createPool(params: ConnectionAttributes): mysql.Pool {

        const pool: mysql.Pool = mysql.createPool({
            database: params.dbName,
            user    : params.user,
            password: params.password,
            port    : params.port,
            host    : params.host,
        });

        this.pool_ = pool; //! fun for a now

        return pool;
    }


    private createConnection(params: ConnectionAttributes): Promise<mysql.Connection> {

        const connection: Promise<mysql.Connection> = mysql.createConnection({
            database: params.dbName,
            user    : params.user,
            password: params.password,
            port    : params.port,
            host    : params.host,
        });

        this.connection_ = connection; //! fun for a now

        return connection;
    }

    //! method in progress
    private createPoolCluster(params: ConnectionAttributes): mysql.PoolCluster {

        let cluster = mysql.createPoolCluster();
        
        return cluster;
    }


    public get queryExecutor(): QueryExecutor{
        return this.queryExecutor_;
    }
}
