import { WhereParser } from "./WhereBuilder";


export default class MysqlWhereParser implements WhereParser {

    private associations: Record<string, (data: any) => void> = {
        'eq'   : (data: any) => this.parseEqual(data),
        'orEq' : (data: any) => this.parseOr(data),
        'andEq': (data: any) => this.parseAnd(data),
        'in'   : (data: any) => this.parseIn(data),
        'andIn': (data: any) => this.parseAndIn(data),
        'orIn' : (data: any) => this.parseOrIn(data),
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

    private parseOr(data: any): string {
        return this.readObject(data, (value: string | number, key: string): string => {
            return `OR ${key} = ${value}`;
        });
    }

    private parseAnd(data: any): string {
        return this.readObject(data, (value: string | number, key: string): string => {
            return `AND ${key} = ${value}`;
        });
    }

    private parseIn(data: any): string {
        return this.readObject(data, (value: string | number | Array<string | number>, key: string): string => {
            return `${key} in (${(value as Array<number>).join(', ')})`;
        })
    }

    private parseAndIn(data: any): string {
        return this.readObject(data, (value: string | number | Array<string | number>, key: string): string => {
            return `AND ${key} in (${(value as Array<number>).join(', ')})`;
        })
    }


    private parseOrIn(data: any): string {
        return this.readObject(data, (value: string | number | Array<string | number>, key: string): string => {
            return `OR ${key} in (${(value as Array<number>).join(', ')})`;
        })
    }
 
}