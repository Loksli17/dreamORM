import { WhereParser } from "./WhereChain";


export default class MysqlWhereParser implements WhereParser {

    private associations: Record<string, (data: any) => void> = {
        'equal': (data: any) => this.parseEqual(data), 
    };

    //! fix returned type
    public parse(data: Array<[string, any]>): string | Record<string, any> {
        
        let sql: string = '';

        data.forEach((value: [string, any], index: number) => {

            sql += ' ' + this.associations[value[0]](value[1]);
        });

        return sql;
    }

    private readObject(obj: Record<string, any>, handler: (value: string | number, key: string) => string): string {

        let result: string = '';

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                result = handler(value, key);
            }
        }

        return result
    }


    private parseEqual(data: any): string {

        return this.readObject(data, (value: string | number, key: string): string => {
            return `${key} = ${value}`;
        });
    }
 
}