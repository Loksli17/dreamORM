
//* wip
export default interface EntityProp {
    
    name: string;
    type: string; //! antoher type
    
    min?      : number;
    max?      : number;
    minLength?: number;
    maxLength?: number;

    isUnique?    : boolean;
    isPrimaryKey?: boolean;
} 