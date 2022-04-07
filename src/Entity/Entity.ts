import Connection       from "../Connection/Connection";
import QueryBuilder     from "../Query/QueryBuilder";
import DecoratorFactory from "../utils/DecoratorFactory";
import EntitySchema     from "./EntitySchema";
import "reflect-metadata";


export interface HashEntityConnection {
    [index: string]: Array<Connection>;
}



//? may I use hash-table for save set(Entity <-> Connections)
//? may be use EntityConnectionAdapter
//! think about Entity name case MongoDb collection's names depend on letter register
export default class Entity {

    private static connections: HashEntityConnection = {};

    public static pushConnection(entityName: string, connection: Connection): void {
        Entity.connections[entityName].push(connection);
    }

    public static addEntity(entityName: string) {
        Entity.connections[entityName] = [];
    }
    
    public static hasEntity(entityName: string): boolean {
        return Entity.connections[entityName] == undefined ? false : true;
    }


    protected get schema(): EntitySchema {

        let schema: EntitySchema;

        let target: Object = Object.getPrototypeOf(this);

        schema = Reflect.getOwnMetadata('schema', target)
  
        return schema;
    }
    

    public build(obj: Record<string, any>): void {

    }
    
    public static query(): QueryBuilder {
        //! check connection before returned QueryBuilder
        return new QueryBuilder(Entity.connections[this.name][0]).table(this.name);
    }

    public save(): void {
        const schema: EntitySchema = this.schema;
        console.log('save: get schema: ', schema);
    }
}