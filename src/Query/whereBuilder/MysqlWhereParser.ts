import WhereBuilder, { WhereParser } from "./WhereBuilder";


export default class MysqlWhereParser implements WhereParser {

    private associations: Record<string, (data: any) => void> = {
        'eq'      : (data: any) => this.parseEqual(data),
        'notEq'   : (data: any) => this.parseEqual(data, true),
        'orEq'    : (data: any) => this.parseOr(data),
        'notOrEq' : (data: any) => this.parseOr(data, true),
        'andEq'   : (data: any) => this.parseAnd(data),
        'notAndEq': (data: any) => this.parseAnd(data, true),
        

        'in'   : (data: any) => this.parseIn(data),
        'andIn': (data: any) => this.parseAndIn(data),
        'orIn' : (data: any) => this.parseOrIn(data),
        'notIn': (data: any) => this.parseIn(data, true),

        'bracket'   : (data: any) => this.parseBracket(data),
        'orBracket' : (data: any) => this.orParseBracket(data),
        'andBracket': (data: any) => this.andParseBracket(data),
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

    private normalArrayToSql(array: Array<string |number>): Array<string> {
        return array.map((value: string | number): string => {
            return `'${value}'`;
        });
    }

    private parseNot(isNot: boolean, symbol: '!' | 'NOT'): string {
        return `${isNot ? symbol :''}`;
    }


    private parseEqual(data: any, isNot: boolean = false): string {

        return this.readObject(data, (value: string | number, key: string): string => {
            return `${key} ${this.parseNot(isNot, '!')}= ${value}`;
        });
    }

    private parseOr(data: any, isNot: boolean = false): string {
        return this.readObject(data, (value: string | number, key: string): string => {
            return `OR ${key} ${this.parseNot(isNot, '!')}= ${value}`;
        });
    }

    private parseAnd(data: any, isNot: boolean = false): string {
        return this.readObject(data, (value: string | number, key: string): string => {
            return `AND ${key} ${this.parseNot(isNot, '!')}= ${value}`;
        });
    }


    private parseIn(data: any, isNot: boolean = false): string {

        return this.readObject(data, (value: string | number | Array<string | number>, key: string): string => {

            if(typeof value == 'string' || typeof value == 'number'){
                throw new Error('Data for `in` must be Array<T>');
            }

            let normalValue: Array<string> = this.normalArrayToSql(value);

            return `${key} ${this.parseNot(isNot, 'NOT')} in (${(normalValue).join(', ')})`;
        });
    }

    private parseAndIn(data: any): string {

        return this.readObject(data, (value: string | number | Array<string | number>, key: string): string => {

            if(typeof value == 'string' || typeof value == 'number'){
                throw new Error('Data for `in` must be Array<T>');
            }

            let normalValue: Array<string> = this.normalArrayToSql(value);

            return `AND ${key} in (${(normalValue).join(', ')})`;
        })
    }

    private parseOrIn(data: any): string {

        return this.readObject(data, (value: string | number | Array<string | number>, key: string): string => {

            if(typeof value == 'string' || typeof value == 'number'){
                throw new Error('Data for `in` must be Array<T>');
            }

            let normalValue: Array<string> = this.normalArrayToSql(value);
            
            return `OR ${key} in (${(normalValue).join(', ')})`;
        })
    }


    private parseBracket(whereBuilder: WhereBuilder): string {
        let result: string = '(' + this.parse(whereBuilder.data) + ')';
        return result;
    }

    private andParseBracket(whereBuilder: WhereBuilder): string {
        let result: string = 'AND (' + this.parse(whereBuilder.data) + ')';
        return result;
    }

    private orParseBracket(whereBuilder: WhereBuilder): string {
        let result: string = 'OR (' + this.parse(whereBuilder.data) + ')';
        return result;
    }
 
}