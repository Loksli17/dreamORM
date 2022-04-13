import Query      from "./Query/QueryBuilder";
import Connection from './Connection/Connection';
import Entity     from "./Entity";

/**
 * ! Class DreamOrm will be Entry Point
 * * this class must be a Singlton?
 */

export interface HashEntityConnection {
    [index: string]: Array<Connection>;
}


class DreamOrm {

    public static instance: DreamOrm;
    
    //? different minds about this structure
    private connections    : Array<Connection>    = [];
    private hashConnections: HashEntityConnection = {};  

    public constructor(connections: Array<Connection> = []){
        this.connections = connections;
        
        if(DreamOrm.instance){
            this.connections = DreamOrm.instance.connections;
            this.hashConnections = DreamOrm.instance.hashConnections;
        } else {
            DreamOrm.instance = this;
        }

    }

    //? think about same connections
    public pushConnection(connection: Connection): void {
        
        this.connections.push(connection);
        
        connection.entities.forEach((entity: typeof Entity) => {
            if(this.hashConnections[entity.name] == undefined) this.hashConnections[entity.name] = [];
            this.hashConnections[entity.name].push(connection);
        });
    }

    public getConnectionByEntity(entityClassName: string): Connection {
        return this.hashConnections[entityClassName][0];
    }

}


export default DreamOrm;