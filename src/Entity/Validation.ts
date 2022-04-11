import Entity       from "../Entity/Entity";
import EntityProp   from "./EntityProp";
import EntitySchema from "./EntitySchema";
import { Blob }     from 'node:buffer';

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

    private associations: Record<string, (propData: EntityPropData) => void> = {
        'minLength': (propData: EntityPropData) => this.minLengthCheck(propData),
        'maxLength': (propData: EntityPropData) => this.maxLengthCheck(propData),
    }


    private typeCheck(propData: EntityPropData) {
        console.log(propData);
    }

    private minLengthCheck(propData: EntityPropData) {

        if(propData.minLength == undefined) {
            throw new Error('minLength is undefined. Why?');
        };
        
        if(propData.minLength > propData.data.length){
            this.errors.push({
                field  : propData.name,
                message: `Length of ${propData.name} is less then ${propData.minLength} `,
            });
        }
    }


    private maxLengthCheck(propData: EntityPropData) {

        if(propData.maxLength == undefined) {
            throw new Error('maxLength is undefined. Why?');
        };

        if(propData.maxLength == -1) {
            
            let 
                message: string = 'Size of text is more then 65535',
                size   : number = 0;

            switch (propData.type) {
                case 'text':
                    size    = 65535;
                    message = `Size of ${propData.name} is more then 65535 bytes`;
                    break;
            }

            if(new Blob([propData.data]).size > size) {
                this.errors.push({
                    field  : propData.name,
                    message: message,
                });
            }

            return;
        }

        if(propData.maxLength < propData.data.length){
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