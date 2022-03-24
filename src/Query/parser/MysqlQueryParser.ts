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

        if(this.queryData.where == undefined){
            throw new Error('No data for where!');
        }

        const params: WhereBuilder | string = this.queryData.where as WhereBuilder | string;

        if(params instanceof WhereBuilder){
            //* WhereBuilder..

            let builder: WhereBuilder = params;

            let parser: MysqlWhereParser = new MysqlWhereParser();
            this.sql += ' WHERE' + parser.parse(builder.data);

        } else {

        }
    }


    private parseOrderBy(): void {

        if(this.queryData.sort == undefined){
            throw new Error('No data for sort!');
        }

        const params: {column: string, order?: 'desc' | 'asc'} | [string, 'desc' | 'asc'] = this.queryData.sort;

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
        this.sql += this.queryData.tableName

        this.parseWhere();

        this.parseOrderBy();

        this.parseLimit();

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