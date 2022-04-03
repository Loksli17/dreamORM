import Connection       from "../Connection/Connection";
import QueryBuilder     from "../Query/QueryBuilder";
import DecoratorFactory from "../utils/DecoratorFactory";


const 

    Prop = () => {

        return (target: Object, propertyKey: string) => {

        }
    },

    PrimaryKey = () => {

        return (target: Object, propertyKey: string) => {
            
            let value: number;

            const getter = () => {
                return value;
            }

            const setter = (newVal: number) => {

            }

            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
            });
        }
    },

    MinLength = (minLength: number) => {

        return (target: Object, propertyKey: string) => {
            
            let value: string;

            const getter = () => {
                return value;
            }

            const setter = (newVal: string) => {
                if(newVal.length < minLength) {
                    Object.defineProperty(target, 'errors', {
                        value: `Value of ${propertyKey} is less then ${minLength}`,
                    })
                }
            }

            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
            });
        }
    },

    MaxLength = (maxLength: number) => {

        return (target: Object, propertyKey: string) => {

        }
    },

    MaxValue = (maxValue: number) => {

        return (target: Object, propertyKey: string) => {

        }
    },

    MinValue = (maxValue: number) => {

        return (target: Object, propertyKey: string) => {

        }
    },

    isUnique = () => {

        return (target: Object, propertyKey: string) => {

        }
    },

    notNull = () => {

        return (target: Object, propertyKey: string) => {

        }
    },
    
    Email = () => {

        return (target: Object, propertyKey: string) => {

        }
    },

    Phone = () => {

        return (target: Object, propertyKey: string) => {

        }
    },
    
    DbDate = () => {
        return (target: Object, propertyKey: string) => {

        }
    },

    ManyToMany = () => {
        return (target: Object, propertyKey: string) => {

        }
    },

    ManyToOne = () => {
        return (target: Object, propertyKey: string) => {

        }
    },

    OneToMany = () => {
        return (target: Object, propertyKey: string) => {

        }
    },

    OneToOne = () => {
        return (target: Object, propertyKey: string) => {

        }
    };
    



export {
    PrimaryKey,
    Prop,

    MinLength,
    MaxLength,
    MaxValue,
    MinValue,

    isUnique,
    notNull,
    
    Email,
    Phone,
    DbDate,

    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
}


export interface HashEntityConnection {
    [index: string]: Array<Connection>;
}



//? may I use hash-table for save set(Entity <-> Connections)
//? may be use EntityConnectionBridge
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
    
    // private queryBuilder: QueryBuilder | undefined;


    // public constructor(connection: Connection){
    //     this.queryBuilder = new QueryBuilder(connection);
    // }

    public build(obj: Record<string, any>): void{

    }
    
    public static query(): QueryBuilder {
        return new QueryBuilder(Entity.connections[this.name][0]).table(this.name);
    }
}