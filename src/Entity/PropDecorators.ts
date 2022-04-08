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

    Date     = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'date'}),
    DateTime = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {type: 'date time'}),

    Min = (min: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['min', min]}),
    Max = (max: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['max', max]}),

    PrimaryKey = (obj?: {autoIncrement: boolean}) => (target: Object, propertyKey: string) => reflectSchemaHandler(
        target, propertyKey, {value: ['isPrimaryKey', obj ? obj : true]}
    ),
    
    Null    = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isNull', true]}),
    NotNull = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isNotNull', true]}),
    Unique  = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isUnique', true]}),

    MinLength = (minLength: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['minLength', minLength]}),
    MaxLength = (maxLength: number) => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['maxLength', maxLength]}),

    Email = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isEmail', true]}),
    Phone = () => (target: Object, propertyKey: string) => reflectSchemaHandler(target, propertyKey, {value: ['isEmail', true]}),

    
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