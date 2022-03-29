import { QueryData  }   from "../QueryBuilder";
import MysqlWhereParser from "../whereBuilder/MysqlWhereParser";
import WhereBuilder     from "../whereBuilder/WhereBuilder";



export default class MysqlQueryParser {

    private queryData: QueryData = {};
    private sql      : string    = '';


    private parseColumns(): void {

        if(this.queryData.fields == undefined) {
            this.sql += '*';
            return;
        };

        this.queryData.fields.forEach((column: string, index: number) => {
            if(index != this.queryData.fields!.length - 1){
                this.sql += `${column}, `;
            } else {
                this.sql += `${column}`;
            }
        });

    }

    private parseLimit(): void {

        if(this.queryData.limit == undefined && this.queryData.offset == undefined) return;

        if(this.queryData.limit == undefined && this.queryData.offset) throw new Error('Offset can not be exist without Limit!')
    
        if(this.queryData.limit && this.queryData.offset == undefined) {
            this.sql += ` LIMIT ${this.queryData.limit}`;
            return;
        }

        if(this.queryData.limit && this.queryData.offset) {
            this.sql += ` LIMIT ${this.queryData.offset}, ${this.queryData.limit}`;
            return;
        }
    }


    private parseWhere(): void {

        const params: WhereBuilder | Record<string, any> = this.queryData.where as WhereBuilder | Record<string, any>;

        let builder: WhereBuilder;

        const typeSwitchHandler = (value: any, obj: Record<string, any>, type: 'and' | 'eq') => {
            let valueType: string = typeof value;

            switch (valueType) {
                case 'string': case 'number': case 'boolean':
                    (type == 'eq') ? builder.eq(obj) : builder.andEq(obj);
                    break;
                case 'object':
                    if(Array.isArray(value)) (type == 'eq') ? builder.in(obj) : builder.andIn(obj);
            }
        }

        if(params instanceof WhereBuilder){
            //* WhereBuilder..
            builder = params;

        } else {
            //* simple object ..
            
            builder = new WhereBuilder();
            let countIter: number = 0;

            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    const value = params[key];
                    
                    const obj: Record<string, any> = {};
                    obj[key] = value;
                    
                    if(countIter == 0) {
                        let valueType: string = typeof value;
                        typeSwitchHandler(valueType, obj, 'eq');
                    } else {
                        let valueType: string = typeof value;
                        typeSwitchHandler(valueType, obj, 'and');
                    }
                }
            }
        }

        let parser: MysqlWhereParser = new MysqlWhereParser();
        this.sql += ' WHERE' + parser.parse(builder.data);
    }


    private parseOrderBy(): void {

        const params: {column: string, order?: 'desc' | 'asc'} | [string, 'desc' | 'asc'] = this.queryData.sort!;

        if(Array.isArray(params)) {
            if(params[1] == undefined) params[1] = 'asc';
            this.sql += ` ORDER BY ${params[0]} ${params[1]}`;
        } else {
            if(params.order == undefined) params.order = 'asc';
            this.sql += ` ORDER BY ${params.column} ${params.order}`;
        }
    }


    public parseSelect(queryData: QueryData): string {

        this.queryData = queryData;

        this.sql += 'SELECT ';
        this.parseColumns();
        this.sql += " FROM ";
        this.sql += this.queryData.tableName;

        if(this.queryData.where != undefined) this.parseWhere();

        if(this.queryData.sort != undefined) this.parseOrderBy();

        if(this.queryData.limit != undefined) this.parseLimit();

        return this.sql;
    }


    public parseQueryResultToTableNames(queryResult: Array<any>): Array<string>{

        let result: Array<string> = [];

        queryResult[0].forEach((item: Record<string, string>) => {
            for (let key in item){
                result.push(item[key]);
            }
        });

        return result;
    }
}