import WhereBuilder, { WhereParser } from "./WhereBuilder";


export default class MongoDbWhereParser implements WhereParser {


    private associations: Record<string, (data: any) => void> = {

        'eq'      : (data: any) => this.parseEqual(data),
        'notEq'   : (data: any) => this.parseEqual(data, true),
        'orEq'    : (data: any) => this.parseEqual(data),
        'notOrEq' : (data: any) => this.parseEqual(data, true),
        'andEq'   : (data: any) => this.parseEqual(data),
        'notAndEq': (data: any) => this.parseEqual(data, true),

        'in'      : (data: any) => this.parseIn(data),
        'notIn'   : (data: any) => this.parseIn(data, true),
        'andIn'   : (data: any) => this.parseIn(data),
        'notAndIn': (data: any) => this.parseIn(data, true),
        'orIn'    : (data: any) => this.parseIn(data),
        'notOrIn' : (data: any) => this.parseIn(data, true),

        'like'      : (data: any) => this.parseLike(data),
        'notLike'   : (data: any) => this.parseLike(data, true),
        'andLike'   : (data: any) => this.parseLike(data),
        'notAndLike': (data: any) => this.parseLike(data, true),
        'orLike'    : (data: any) => this.parseLike(data),
        'notOrLike' : (data: any) => this.parseLike(data, true),

        'bracket'   : (data: any) => this.parseBracket(data),
        'orBracket' : (data: any) => this.parseBracket(data),
        'andBracket': (data: any) => this.parseBracket(data),
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

    private recognizeBracket(dataItem: [string, any]): boolean {
        
        dataItem[0] = dataItem[0].toLowerCase();

        if(dataItem[0].includes('bracket')){
            return true;
        }

        return false;
    }

    private checkBrackets(data: Array<[string, any]>): void {

        data.forEach((value: [string, any]) => {
            if(!value[0].toLowerCase().includes('bracket')) {
                throw new Error('You should add chain with bracket methods, when you use mongoDB!');
            }
        });
    }


    /**
     * * at first i must parse brackets and then content of brackets!!
     * * in documention we should write about right usage of brackets with mongoDB 
     * @param data 
     * @returns 
     */
    //! fix returned type
    public parse(data: Array<[string, any]>): Record<string, any> {

        let result: Record<string, any> = {};

        if(data.length == 1){
            return this.associations[data[0][0]](data[0][1]) as any;
        }

        for(let i = 1; i < data.length; i++) {

            let condStatus: 'or' | 'and' = data[i][0].includes('or') ? 'or' : 'and';

            if(this.recognizeBracket(data[0])) this.checkBrackets(data);

            if(i == 1){
                result[`$${condStatus}`] = [];
                result[`$${condStatus}`].push(this.associations[data[0][0]](data[0][1]));
            }

            result[`$${condStatus}`].push(this.associations[data[i][0]](data[i][1]));
        }

        return result;
    }

    
    private parseEqual(data: any, isNot: boolean = false): Record<string, any> {

        const obj: Record<string, any> = {}; 

        return this.readObject(data, (value: string | number | Record<string, any>, key: string): Record<string, any> => {
            obj[key] = (isNot) ? {$ne: value} : value;
            return obj;
        });
    }
     

    private parseIn(data: any, isNot: boolean = false): Record<string, any> {
        
        const obj: Record<string, any> = {}; 

        return this.readObject(data, (value: string | number | Record<string, any>, key: string): Record<string, any> => {
            obj[key] = (isNot) ? {$nin: value} : {$in: value};
            return obj;
        });
    }


    private parseLike(data: any, isNot: boolean = false): Record<string, any> {

        const obj: Record<string, any> = {}; 

        return this.readObject(data, (value: string | number | Record<string, any>, key: string): Record<string, any> => {
            if(typeof value != 'string') throw new Error(`Value of like must be string`); //! it is fun for a now

            if(value[0]                != '%') value = '^' + value;
            if(value[value.length - 1] != '%') value = value + '$';

            value = value.replace(/%/g, '');

            let reg: RegExp = new RegExp(value);
            obj[key] = (isNot) ? {$not: reg} : reg;
            return obj;
        });
    }


    private parseBracket(whereBuilder: WhereBuilder): Record<string, any> {
        return this.parse(whereBuilder.data);
    }

}