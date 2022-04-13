import Connection from "../Connection/Connection";
import Entity       from "../Entity/Entity";
import QueryBuilder from "../Query/QueryBuilder";
import EntityProp   from "./EntityProp";
import EntitySchema from "./EntitySchema";


export interface ValidationError {
    field  : string;
    message: string;
}


interface EntityPropData extends EntityProp {
    data?: any;
}


//! think about prop without decorator 
export default class Validation {

    private schema      : EntitySchema | undefined;
    private validateData: Array<EntityPropData>     = [];
    private errors      : Array<ValidationError>    = [];
    private connection  : Connection;


    constructor(connection: Connection){
        this.connection = connection;
    }

    private associations: Record<string, (propData: EntityPropData) => void> = {
        'minLength': (propData: EntityPropData) => this.minLengthCheck(propData),
        'maxLength': (propData: EntityPropData) => this.maxLengthCheck(propData),

        'min': (propData: EntityPropData) => this.minCheck(propData),
        'max': (propData: EntityPropData) => this.maxCheck(propData),

        "isUnique": (propData: EntityPropData) => this.uniqueCheck(propData),
    }


    private typeCheck(propData: EntityPropData) {
        
    }

    private uniqueCheck(propData: EntityPropData) {

        let primaryKeyProp: EntityProp | undefined;

        this.schema?.props.forEach((prop: EntityProp) => {
            if (prop.isPrimaryKey) primaryKeyProp = prop;
        });

        if(primaryKeyProp == undefined) {
            throw new Error('Using of unique is unimpossible without PrimaryKey!');
        }

        const queryBuilder: QueryBuilder = new QueryBuilder(this.connection);
    }


    private maxCheck(propData: EntityPropData) {

        if(typeof propData.data != 'number') {
            throw new Error('max is created for only number type, Sorry =((');
        }

        if(propData.max == undefined) {
            throw new Error('max is undefined. Why?');
        };

        if(propData.max > propData.data ) {
            this.errors.push({
                field  : propData.name,
                message: `${propData.name} is less then ${propData.min} `,
            });
        }

    }

    private minCheck(propData: EntityPropData) {

        if(typeof propData.data != 'number') {
            throw new Error('maxLength is created for only string type, Sorry =((');
        }

        if(propData.min == undefined) {
            throw new Error('min is undefined. Why?');
        };

        if(propData.min < propData.data ) {
            this.errors.push({
                field  : propData.name,
                message: `${propData.name} is less then ${propData.min} `,
            });
        }
    }


    private minLengthCheck(propData: EntityPropData) {

        if(typeof propData.data != 'string') {
            throw new Error('maxLength is created for only string type, Sorry =((');
        }

        if(propData.minLength == undefined) {
            throw new Error('minLength is undefined. Why?');
        };
        
        if(propData.minLength > propData.data.length) {
            this.errors.push({
                field  : propData.name,
                message: `Length of ${propData.name} is less then ${propData.minLength} `,
            });
        }
    }

    private maxLengthCheck(propData: EntityPropData) {

        if(typeof propData.data != 'string') {
            throw new Error('maxLength is created for only string type, Sorry =((');
        }

        if(propData.maxLength == undefined) {
            throw new Error('maxLength is undefined. Why?');
        };

        if(propData.maxLength == -1) {
            
            let 
                message: string = 'Size of text is more than 65535',
                size   : number = 0;

            switch (propData.type) {
                case 'text':
                    size    = 65535;
                    message = `Size of ${propData.name} is more than 65535 bytes`;
                    break;
            }

            if(new TextEncoder().encode(propData.data).length > size) {
                this.errors.push({
                    field  : propData.name,
                    message: message,
                });
            }

            return;
        }

        if(propData.maxLength < propData.data.length) {
            this.errors.push({
                field  : propData.name,
                message: `Length of ${propData.name} is more then ${propData.maxLength} `,
            });
        }
    }


    public execute(entitySchema: EntitySchema, obj: Record<string, any> | Entity): Array<ValidationError> {
        
        this.schema = entitySchema;

        //? add checking of props array in schema, if schema don't have prop from obj show warn? 

        entitySchema.props.forEach((prop: EntityProp) => {
            let dataProp: EntityPropData = Object.assign({}, prop);
            dataProp.data = (obj as Record<string, any>)[prop['name']];
            this.validateData.push(dataProp);
        });

        this.validateData.forEach((propData: EntityPropData) => {
            this.typeCheck(propData);
            
            let key: keyof EntityPropData;

            for (key in propData) {
                if (Object.prototype.hasOwnProperty.call(propData, key)) {
                    if(this.associations[key]) this.associations[key](propData);
                }
            }
            
        });

        return this.errors;
    }
}