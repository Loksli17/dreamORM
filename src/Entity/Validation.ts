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


export default class Validation {

    private schema      : EntitySchema | undefined;
    private validateData: Array<EntityPropData>     = [];


    public execute(entitySchema: EntitySchema, obj: Record<string, any> | Entity): Array<ValidationError> {
        
        this.schema = entitySchema;
        let result: Array<ValidationError> = [];

        entitySchema.props.forEach((prop: EntityProp) => {
            let dataProp: EntityPropData = Object.assign({}, prop);
            dataProp.data = (obj as Record<string, any>)[prop['name']];
            this.validateData.push(dataProp);
        });
        
        console.log(this.validateData);

        return result;
    }
}