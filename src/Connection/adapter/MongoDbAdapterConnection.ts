import QueryBuilder             from "../../Query/QueryBuilder";
import MongoDbQueryExecutor     from "../../Query/queryExecutor/MongoDbQueryExecutor";
import QueryExecutor            from "../../Query/queryExecutor/QueryExecutor";
import AdapterConnection        from "./AdapterConnection";
import { ConnectionAttributes } from '../Connection';
import { Db, MongoClient }      from "mongodb";




export default class MongoDbAdapterConnection implements AdapterConnection {

    private queryExecutor_!: MongoDbQueryExecutor;

    private connectionType: 'connection' | 'pool' | 'cluster' = 'connection';

    private connectionTypesAssociations: Record<string, (params: ConnectionAttributes) => Promise<Db>> = {
        // pool      : params => this.createPool(params),
        connection: async (params) => await this.createConnection(params),
        // cluster   : params => this.createPoolCluster(params),
    }
    
    public create(params: ConnectionAttributes): void {
        if(params.type) this.connectionType = params.type;

        const connector: Promise<Db> = this.connectionTypesAssociations[this.connectionType](params);
        
        this.queryExecutor_ = new MongoDbQueryExecutor(this.connectionType, connector);
    }


    private async createConnection(params: ConnectionAttributes): Promise<Db> {

        let 
            host : string = "localhost",
            port : number = 27017, 
            url  : string = "";
        
        if(params.host) host = params.host;
        if(params.port) port = params.port;

        url = `mongodb://${host}:${port}`;

        const client = new MongoClient(url);
        await client.connect();

        return client.db(params.dbName);
    }


    public get queryExecutor(): QueryExecutor {
        return this.queryExecutor_;
    }
}

