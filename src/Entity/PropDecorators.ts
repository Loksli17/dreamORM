import EntitySchema from "./EntitySchema";
import EntityProp   from "./EntityProp";
import "reflect-metadata";


interface HandlerParams {
    value?: [keyof EntityProp, any];
    type? : string; //! add normal type
}




//? catch error with order of decorators
const reflectSchemaHandler = (target: Object, propertyKey: string, params?: HandlerParams) => {

    let 
        schema: EntitySchema = Reflect.getOwnMetadata('schema', target),
        prop  : EntityProp;

    if(schema == undefined){
        schema      = new EntitySchema();
        schema.name = target.constructor.name;
        
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


const combineReflectSchemaHandler = (target: Object, propertyKey: string, params: Array<HandlerParams>) => {
    params.forEach((params: HandlerParams) => {
        reflectSchemaHandler(target, propertyKey, params);
    });
}


const 

    Int         = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'integer'}),
    UnsignedInt = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'unsigned integer'}),
    Float       = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'float'}),
    Boolean     = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'boolean'}),

    Text = (data?: {min?: number, max?: number}) => (target: Object, propertyKey: string) => {

        let params: Array<HandlerParams> = [];

        params.push({type: 'text'});
        
        params.push({value: ['minLength', (data && data.min) ? data.min : -1]});
        params.push({value: ['maxLength', (data && data.max) ? data.max : -1]});

        return combineReflectSchemaHandler(target, propertyKey, params);
    },


    Date     = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'date'}),
    DateTime = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'date time'}),

    Min = (min: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['min', min]}),
    Max = (max: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['max', max]}),

    PrimaryKey = (obj?: {autoIncrement: boolean}) => (target: Object, propertyKey: string) => reflectSchemaHandler(
        target, propertyKey, {value: ['isPrimaryKey', obj ? obj : true]}
    ),
    
    Null    = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isNull', true]}),
    NotNull = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isNotNull', true]}), //! check
    Unique  = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isUnique', true]}),

    MinLength = (minLength: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['minLength', minLength]}),
    MaxLength = (maxLength: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['maxLength', maxLength]}),

    Email = ()                                => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isEmail', true]}),
    Phone = (data?: {first: string} | RegExp) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isPhone', data]}),

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
    Boolean,
    Float,

    Text,
    
    Date,
    DateTime,

    PrimaryKey,

    Min,
    Max,

    Unique,
    NotNull,
    Null,

    MinLength,
    MaxLength,
    
    Email,
    Phone,
    
    DbDate,

    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
}