import Query      from "./Query/QueryBuilder";
import Connection from './Connection/Connection';

/**
 * ! Class DreamOrm will be Entry Point
 * * this class must be a Singlton?
 */


class DreamOrm {

    public static instance: DreamOrm;
    private connections: Array<Connection> = [];

    public constructor(connections: Array<Connection> = []){
        this.connections = connections;
        DreamOrm.instance = (DreamOrm.instance) || (this);
    }

    public pushConnection(connection: Connection): void {
        this.connections.push(connection);
    }
}


export default DreamOrm;