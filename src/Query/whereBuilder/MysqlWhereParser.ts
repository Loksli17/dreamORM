import WhereBuilder, { WhereParser } from "./WhereBuilder";


export default class MysqlWhereParser implements WhereParser {

    private associations: Record<string, (data: any) => void> = {
        'eq'      : (data: any) => this.parseEqual(data),
        'notEq'   : (data: any) => this.parseEqual(data, true),
        'orEq'    : (data: any) => this.addOr(this.parseEqual(data)),
        'notOrEq' : (data: any) => this.addOr(this.parseEqual(data, true)),
        'andEq'   : (data: any) => this.addAnd(this.parseEqual(data)),
        'notAndEq': (data: any) => this.addAnd(this.parseEqual(data, true)),

        'in'      : (data: any) => this.parseIn(data),
        'notIn'   : (data: any) => this.parseIn(data, true),
        'andIn'   : (data: any) => this.addAnd(this.parseIn(data)),
        'notAndIn': (data: any) => this.addAnd(this.parseIn(data, true)),
        'orIn'    : (data: any) => this.addOr(this.parseIn(data)),
        'notOrIn' : (data: any) => this.addOr(this.parseIn(data, true)),

        'like'      : (data: any) => this.parseLike(data),
        'notLike'   : (data: any) => this.parseLike(data, true),
        'andLike'   : (data: any) => this.addAnd(this.parseLike(data)),
        'notAndLike': (data: any) => this.addAnd(this.parseLike(data, true)),
        'orLike'    : (data: any) => this.addOr(this.parseLike(data)),
        'notOrLike' : (data: any) => this.addOr(this.parseLike(data, true)),

        'between'      : (data: any) => this.parseBetween(data),
        'notBetween'   : (data: any) => this.parseBetween(data, true),
        'andBetween'   : (data: any) => this.addAnd(this.parseBetween(data)),
        'notAndBetween': (data: any) => this.addAnd(this.parseBetween(data, true)),
        'orBetween'    : (data: any) => this.addOr(this.parseBetween(data)),
        'notOrBetween' : (data: any) => this.addOr(this.parseBetween(data, true)),

        'regex'      : (data: any) => this.parseRegex(data),
        'notRegex'   : (data: any) => this.parseRegex(data, true),
        'andRegex'   : (data: any) => this.addAnd(this.parseRegex(data)),
        'notAndRegex': (data: any) => this.addAnd(this.parseRegex(data, true)),
        'orRegex'    : (data: any) => this.addOr(this.parseRegex(data)),
        'notOrRegex' : (data: any) => this.addOr(this.parseRegex(data, true)),

        'bracket'   : (data: any) => this.parseBracket(data),
        'orBracket' : (data: any) => this.addOr(this.parseBracket(data)),
        'andBracket': (data: any) => this.addOr(this.parseBracket(data)),
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
        if(symbol == 'NOT') symbol += ' ';
        return `${isNot ? symbol : ''}`;
    }

    private addAnd(query: string): string{
        return `AND ${query}`;
    }

    private addOr(query: string): string{
        return `OR ${query}`;
    }


    private parseEqual(data: any, isNot: boolean = false): string {

        return this.readObject(data, (value: string | number, key: string): string => {
            return `${key} ${this.parseNot(isNot, '!')}= ${value}`;
        });
    }


    private parseIn(data: any, isNot: boolean = false): string {

        return this.readObject(data, (value: string | number | Array<string | number>, key: string): string => {

            if(typeof value == 'string' || typeof value == 'number'){
                throw new Error('Data for `in` must be Array<T>');
            }

            let normalValue: Array<string> = this.normalArrayToSql(value);

            return `${key} ${this.parseNot(isNot, 'NOT')}in (${(normalValue).join(', ')})`;
        });
    }


    private parseLike(data: any, isNot: boolean = false): string {
        return this.readObject(data, (value: string | number, key: string): string => {
            return `${key} ${this.parseNot(isNot, 'NOT')}LIKE '${value}'`
        });
    }


    private parseBetween(data: any, isNot: boolean = false): string {
        
        return this.readObject(data, (value: string | number, key: string): string => {
            
            if(typeof value == 'string' || typeof value == 'number'){
                throw new Error('Data for `between` must be [string | number, string | number]');
            }

            let normalValue: Array<string> = this.normalArrayToSql(value);

            return `${key} ${this.parseNot(isNot, 'NOT')}BETWEEN ${normalValue[0]} AND ${normalValue[1]}`
        });
    }


    private parseRegex(data: any, isNot: boolean = false): string {
        
        return this.readObject(data, (value: string | number, key: string): string => {
            return `${key} REGEXP '${value}'`;
        });
    }


    private parseBracket(whereBuilder: WhereBuilder): string {
        let result: string = '(' + this.parse(whereBuilder.data) + ')';
        return result;
    }
 
}