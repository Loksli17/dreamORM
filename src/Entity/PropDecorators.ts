import EntitySchema from "./EntitySchema";
import EntityProp   from "./EntityProp";
import "reflect-metadata";


interface HandlerParams {
    value?: [string, any];
    type? : string; //! add normal type
}


const associations: Record<string, (prop: any, data: any) => void> = {

    'min': (prop: EntityProp, min: number) => { prop.min = min },
    'max': (prop: EntityProp, max: number) => { prop.max = max },
};


const reflectSchemaHandler = (target: Object, propertyKey: string, params?: HandlerParams) => {

    let 
        schema: EntitySchema = Reflect.getOwnMetadata('schema', target),
        prop  : EntityProp;

    if(schema == undefined){
        schema = new EntitySchema();
        Reflect.defineMetadata('schema', schema, target);
    }

    if(params?.type != undefined){

        //* ..creation new prop for Entity
        prop = {
            name: propertyKey,
            type: params.type,
        }

        schema.props.push(prop);

    } else {

        //* .. getting existen prop 
        prop = schema.props.filter(
            (value: EntityProp) => value.name == propertyKey
        )[0];

        if(params?.value == undefined) return;

        associations[params.value[0]](prop, params.value[1]);
    }

    Reflect.defineMetadata('schema', schema, target);
}



const 

    Integer = () => {
        return (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'integer'})
    },

    Min = (min: number) => {
        return (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['min', min]})
    },

    Max = (max: number) => {
        return (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['max', max]})
    },


    Prop = function() {
        return function(target: Object, propertyKey: string){
            console.log('prop:', target);
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

    Integer,
    Min,
    Max,

    
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