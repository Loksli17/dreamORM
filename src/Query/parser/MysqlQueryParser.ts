import { QueryData  } from "../QueryBuilder";



export default class MysqlQueryParser {

    private queryData: QueryData = {};
    private sql        : string    = '';


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


    public parseSelect(queryData: QueryData): string {

        this.queryData = queryData;

        this.sql += 'SELECT ';
        this.parseColumns();
        this.sql += " FROM ";
        this.sql += this.queryData.tableName

        this.parseLimit();

        return this.sql;
    }
}