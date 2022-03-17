import MysqlQueryParser    from '../parser/MysqlQueryParser';
import { QueryData }       from '../QueryBuilder';
import MysqlQueryExecutor  from '../queryExecutor/MysqlQueryExecutor';
import QueryBuilderAdapter from './QueryBuilderAdapter';


interface MysqlTableColumn {
    Field    : string;
    Type     : string;
    Collation: string;
    Null     : string;
    Key      : string;
    Default  : string;
    Extra    : string;

}


//!think about MysqlQueryParser for parse QueryObject in SQL query

export default class MysqlQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryData    : QueryData           = {};
    private queryExecutor: MysqlQueryExecutor;
    private queryParser  : MysqlQueryParser;


    constructor(queryExecutor: MysqlQueryExecutor){
        this.queryExecutor = queryExecutor;
        this.queryParser   = new MysqlQueryParser();
    }


    private clearQueryData(): void {
        this.queryData = {};
    }


    //* end point method
    //! add different arguments this method is not simple
    public async getFieldInfo(): Promise<Array<MysqlTableColumn>> {

        const
            queryString: string = `show full columns from ${this.queryData.tableName}`,
            queryResult = await this.queryExecutor.query(queryString);

        this.clearQueryData();

        return queryResult[0][0];
    }


    //* end point method
    public async getTableNames(): Promise<Array<string>> {

        let 
            result     : Array<string> = [],
            queryString: string        = `show tables`,
            queryResult: Array<any>    = await this.queryExecutor.query(queryString);

        queryResult[0].forEach((item: Record<string, string>) => {
            for (let key in item){
                result.push(item[key]);
            }
        });

        this.clearQueryData();

        return result;
    }


    //* end point method
    public async findAll(queryObject: QueryData): Promise<Array<Record<string, any>>> {
        
        let 
            queryString: string = this.queryParser.parseSelect(queryObject),
            queryResult;

        console.log(queryString);

        queryResult = await this.queryExecutor.query(queryString);

        this.clearQueryData();
        
        return queryResult[0];
    }


    /**
     * create database dreamorm;
     */
    public createDb(): void {

    }
    
}