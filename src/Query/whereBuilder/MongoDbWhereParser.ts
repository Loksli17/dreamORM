import { WhereParser } from "./WhereBuilder";


export default class MongoDbWhereParser implements WhereParser {


    private associations: Record<string, (data: any) => void> = {
        'eq'      : (data: any) => this.parseEqual(data),
        'notEq'   : (data: any) => this.parseEqual(data, true),
        // 'orEq'    : (data: any) => this.addOr(this.parseEqual(data)),
        // 'notOrEq' : (data: any) => this.addOr(this.parseEqual(data, true)),
        // 'andEq'   : (data: any) => this.addAnd(this.parseEqual(data)),
        // 'notAndEq': (data: any) => this.addAnd(this.parseEqual(data, true)),
    }

    private readObject(obj: Record<string, any>, handler: (value: string | number | Record<string, any>, key: string) => Record<string, any>): Record<string, any> {

        let result: Record<string, any> = {};

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                result = handler(value, key);
            }
        }

        return result;
    }
    

    //! fix returned type
    public parse(data: Array<[string, any]>): Record<string, any> {
        
        let result: Record<string, any> = {};
        
        data.forEach((value: [string, any]) => {
            result = {...result, ...this.associations[value[0]](value[1]) as any}
        });

        return result;
    }

    
    private parseEqual(data: any, isNot: boolean = false): Record<string, any> {

        const obj: Record<string, any> = {}; 

        return this.readObject(data, (value: string | number | Record<string, any>, key: string): Record<string, any> => {
            obj[key] = (isNot) ? {$ne: value} : value;
            return obj;
        });
    }

}