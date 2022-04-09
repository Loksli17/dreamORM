import EntitySchema from "./EntitySchema";

export interface ValidationError {

}


export default class Validation {


    public execute(entitySchema: EntitySchema): Array<ValidationError> {
        
        let result: Array<ValidationError> = [];

        console.log('schema:', entitySchema);

        return result;
    }
}