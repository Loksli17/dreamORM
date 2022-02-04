import MysqlAdapterConnection    from './MysqlAdapterConnection';
import PostgreeAdapterConnection from './PostgreeAdapterConnection';
import MongoDbAdapterConnection  from './MongoDbAdapterConnection';

import { ConnectionAttributes } from '../Connection';
import QueryBuilder             from '../../Query/QueryBuilder';
import QueryExecutor            from '../queryExecutor/QueryExecutor';


export default interface AdapterConnection {

    queryExecutor: QueryExecutor;

    create(params: ConnectionAttributes): void;

    query?: () => QueryBuilder;
}



export abstract class AdapterConnectionFactory {

    public static create(adapterName: "mysql" | "postgre" | "mongoDb" ): AdapterConnection {

        switch(adapterName) {
            case 'mysql':
                return new MysqlAdapterConnection();
            case 'postgre': 
                return new PostgreeAdapterConnection();
            case 'mongoDb':
                return new MongoDbAdapterConnection();
        }
    } 
}