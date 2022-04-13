import Connection                      from "../Connection/Connection";
import QueryBuilder                    from "../Query/QueryBuilder";
import DecoratorFactory                from "../utils/DecoratorFactory";
import EntitySchema                    from "./EntitySchema";
import Validation, { ValidationError } from "./Validation";
import DreamOrm                        from "../main";
import "reflect-metadata";




export interface HashEntityConnection {
    [index: string]: Array<Connection>;
}



//? may I use hash-table for save set(Entity <-> Connections)
//? may be use EntityConnectionAdapter
//! think about Entity name case MongoDb collection's names depend on letter register
export default class Entity {


    protected get schema(): EntitySchema {
        let schema: EntitySchema;
        let target: Object = Object.getPrototypeOf(this);
        schema = Reflect.getOwnMetadata('schema', target)
        return schema;
    }
    

    public build(obj: Record<string, any>): void {

    }
    

    public static query(): QueryBuilder {

        const orm: DreamOrm = new DreamOrm();

        //! check connection before returned QueryBuilder
        const entity: Entity = new this();
        return new QueryBuilder(orm.getConnectionByEntity(this.name), entity.schema).table(this.name);
    }


    public save(): void {

        if(this.schema) {
            const orm: DreamOrm = new DreamOrm();
            const validation: Validation = new Validation(orm.getConnectionByEntity(this.constructor.name));
            validation.execute(this.schema, this);
        }

        const schema: EntitySchema = this.schema;
    }

    public validate(): Array<ValidationError> {

        if(!this.schema) throw new Error('Validation is impossible without any data about Entity!');

        const orm: DreamOrm = new DreamOrm();
        return new Validation(orm.getConnectionByEntity(this.constructor.name)).execute(this.schema, this);
    }
}