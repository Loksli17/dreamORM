import AdapterConnection, { AdapterConnectionFactory } from './adapter/AdapterConnection';
import QueryExecutor                                   from '../Query/queryExecutor/QueryExecutor';
import Entity, { HashEntityConnection }                from '../Entity/Entity';


/**
 * ! postgre has same options
 * * we should create opportunity "make many connetions to different databases" 
 * ! make abstract class 
 */

export interface ConnectionAttributes {
    dbName   : string;
    password?: string;
    user?    : string;
    port?    : number;
    host?    : string;
    type?    : 'connection' | 'pool' | 'cluster';
    adapter  : 'mysql' | 'postgre' | 'mongoDb';
    entities?: Array<typeof Entity>; 
}



//? class for connection item? and Big class for connection module (think about patterns) 
export default class Connection implements ConnectionAttributes {

    //! fix this props and create default props in ConnectionAdapters !!!!
    private dbName_  : string; 
    private password_: string                            = "";
    private user_    : string                            = "root";
    private port_    : number                            = 3306;
    private host_    : string                            = "127.0.0.1";
    private type_    : 'connection' | 'pool' | 'cluster' = 'connection';
    private adapter_ : 'mysql' | 'postgre' | 'mongoDb'; 

    private adapterConnection: AdapterConnection;


    public constructor(params: ConnectionAttributes) {
        this.dbName_ = params.dbName;

        if(params.password) this.password_ = params.password;
        if(params.user)     this.user_     = params.user;
        if(params.port)     this.port_     = params.port;
        if(params.host)     this.host_     = params.host;
        if(params.type)     this.type_     = params.type;
        this.adapter_  = params.adapter;

        this.adapterConnection = AdapterConnectionFactory.create(params.adapter);

        this.adapterConnection.create({
            dbName  : this.dbName_,
            password: this.password_,
            user    : this.user_,
            port    : this.port_,
            host    : this.host_,
            adapter : this.adapter_,
            type    : this.type_,
        });

        //? to different place
        if(params.entities){
            params.entities.forEach((entityClass: typeof Entity) => {
                if(!Entity.hasEntity(entityClass.name)) Entity.addEntity(entityClass.name);
                Entity.pushConnection(entityClass.name, this);
            });
        }
        
    }


    public get queryExecutor(): QueryExecutor {
        return this.adapterConnection.queryExecutor;
    }


    public get dbName(): string {
        return this.dbName_;
    }

    public get password(): string {
        return this.password_;
    }

    public get user(): string {
        return this.user_;
    }

    public get host(): string {
        return this.host_;
    }

    public get port(): number {
        return this.port_;
    }

    public get adapter(): 'mysql' | 'postgre' | 'mongoDb' {
        return this.adapter_;
    }



    public set dbName(name: string){
        this.dbName_ = name;
    }

    public set password(pass: string) {
        this.password_ = pass;
    }

    public set user(user: string) {
        this.user_ = user;
    }

    public set host(host: string) {
        this.host_ = host;
    }

    public set port(port: number) {
        this.port_ = port;
    }

    public set adapter(adapter: 'mysql' | 'postgre' | 'mongoDb') {
        this.adapter_ = adapter;
    }

}