import * as mysql    from 'mysql2/promise';
import QueryExecutor from './QueryExecutor';



export default class MysqlQueryExecutor implements QueryExecutor {

    private pool_!      : mysql.Pool;
    private connection_!: Promise<mysql.Connection>;
    private cluster_!   : mysql.PoolCluster;
    
    private type: 'connection' | 'pool' | 'cluster';

    private connectionTypesAssociations: Record<string, (connector: mysql.Pool | Promise<mysql.Connection> | mysql.PoolCluster) => void> = {
        pool      : connector => this.pool_       = connector as mysql.Pool,
        connection: connector => this.connection_ = connector as Promise<mysql.Connection>,
        cluster   : connector => this.cluster_    = connector as mysql.PoolCluster,
    }

    private queryTypesAssociations: Record<string, (sqlString: string) => any> = {

        pool : (sqlString: string) => {
            this.pool_.query(sqlString).then((value: any) => {
                return value;
            });
        },

        connection: (sqlString: string) => {
            this.connection_.then((connection: mysql.Connection) => {
                return connection.query(sqlString);
            }).then((value: any) => {
                return value;
            });
        },

        cluster: (sqlString: string) => {
            console.log('funny cluster query!! Ahahhaha. Nice doggo', sqlString);
        }
    }
    

    public constructor(type: 'connection' | 'pool' | 'cluster', connector: mysql.Pool | Promise<mysql.Connection> | mysql.PoolCluster) {
        this.type = type;
        this.connectionTypesAssociations[type](connector);
    }

    public async query(sqlString: string): Promise<any> {
        return this.queryTypesAssociations[this.type](sqlString);
    }
}