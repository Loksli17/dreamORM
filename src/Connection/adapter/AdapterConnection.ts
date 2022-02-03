import MysqlAdapterConnection    from './MysqlAdapterConnection';
import PostgreeAdapterConnection from './PostgreeAdapterConnection';
import MongoDbAdapterConnection  from './MongoDbAdapterConnection';

import { BasicConnectionAttributes } from '../Connection';
import QueryBuilder from '../../Query/Query';


export default interface AdapterConnection {

    create(params: BasicConnectionAttributes): void;

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