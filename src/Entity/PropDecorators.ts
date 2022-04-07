import EntitySchema from "./EntitySchema";
import EntityProp   from "./EntityProp";
import "reflect-metadata";


interface HandlerParams {
    value?: [keyof EntityProp, any];
    type? : string; //! add normal type
}


const associations: Record<string, (prop: any, data: any) => void> = {

    'min': (prop: EntityProp, min: number) => { prop.min = min },
    'max': (prop: EntityProp, max: number) => { prop.max = max },
};


//? catch error with order of decorators
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

        (prop[params.value[0]] as any) = params.value[1];
    }

    Reflect.defineMetadata('schema', schema, target);
}



const 

    Int         = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'integer'}),
    UnsignedInt = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'unsigned integer'}),


    Min = (min: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['min', min]}),
    Max = (max: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['max', max]}),

    PrimaryKey = (obj?: {autoIncrement: boolean}) => (target: Object, propertyKey: string) => reflectSchemaHandler(
        target, propertyKey, {value: ['isPrimaryKey', obj ? obj : true]}
    ),
    
    Null       = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isNull', true]}),
    NotNull    = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isNotNull', true]}),
    

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

    Unique = () => {

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

    Int,
    UnsignedInt,
    Min,
    Max,


    PrimaryKey,

    MinLength,
    MaxLength,
    MaxValue,
    MinValue,

    Unique,
    NotNull,
    Null,
    
    Email,
    Phone,
    DbDate,

    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
}