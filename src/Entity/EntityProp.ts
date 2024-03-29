
//* wip
export default interface EntityProp {
    
    name: string;
    type: string; //! antoher type
    
    min?      : number;
    max?      : number;
    minLength?: number;
    maxLength?: number;

    isUnique?    : boolean;
    isPrimaryKey?: boolean | {autoIncrement: boolean};
    isNull?      : boolean;
    isNotNull?   : boolean;

    isEmail?: boolean;
    isPhone?: {first: string} | RegExp;
} 