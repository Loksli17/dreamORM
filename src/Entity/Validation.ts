import Entity       from "../Entity/Entity";
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
    private validateData: Array<EntityPropData> = [];


    private typeCheck(propData: EntityPropData) {
        console.log(propData);
    }


    public execute(entitySchema: EntitySchema, obj: Record<string, any> | Entity): Array<ValidationError> {
        
        this.schema = entitySchema;
        let result: Array<ValidationError> = [];

        //? add checking of props array in schema, if schema don't have prop from obj show warn? 

        entitySchema.props.forEach((prop: EntityProp) => {
            let dataProp: EntityPropData = Object.assign({}, prop);
            dataProp.data = (obj as Record<string, any>)[prop['name']];
            this.validateData.push(dataProp);
        });

        this.validateData.forEach((propData: EntityPropData) => {
            this.typeCheck(propData);
        });

        return result;
    }
}