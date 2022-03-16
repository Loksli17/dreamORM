import { QueryObject } from "../QueryBuilder";



export default class MysqlQueryParser {

    private queryObject: QueryObject = {};
    private sql        : string      = '';


    private parseColumns(): void {

        if(this.queryObject.columns == undefined) {
            this.sql += '*';
            return;
        };

        this.queryObject.columns.forEach((column: string, index: number) => {
            if(index != this.queryObject.columns!.length - 1){
                this.sql += `${column}, `;
            }
            this.sql += `${column}`;
        });

    }


    private parseLimit(): void {

        if(this.queryObject.limit == undefined && this.queryObject.offset == undefined) return;

        if(this.queryObject.limit == undefined && this.queryObject.offset) throw new Error('Offset can not be exist without Limit!')
    
        if(this.queryObject.limit && this.queryObject.offset == undefined) {
            this.sql += ` LIMIT ${this.queryObject.limit}`;
            return;
        }

        if(this.queryObject.limit && this.queryObject.offset) {
            this.sql += ` LIMIT ${this.queryObject.offset}, ${this.queryObject.limit}`;
            return;
        }
    }


    public parseSelect(queryObject: QueryObject): string {

        this.queryObject = queryObject;

        this.sql += 'SELECT ';
        this.parseColumns();
        this.sql += " FROM ";
        this.sql += this.queryObject.tableName

        this.parseLimit();

        return this.sql;
    }
}