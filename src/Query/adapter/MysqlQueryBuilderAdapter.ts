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


export default class MysqlQueryBuilderAdapter implements QueryBuilderAdapter {

    private queryExecutor: MysqlQueryExecutor;
    private queryParser  : MysqlQueryParser;


    constructor(queryExecutor: MysqlQueryExecutor){
        this.queryExecutor = queryExecutor;
        this.queryParser   = new MysqlQueryParser();
    }


    //* end point method
    //! add different arguments this method is not simple
    public async getFieldsInfo(queryData: QueryData): Promise<Array<MysqlTableColumn>> {

        const
            queryString: string = `show full columns from ${queryData.tableName}`,
            queryResult = await this.queryExecutor.query(queryString);

        return queryResult[0];
    }


    //* end point method
    public async getTableNames(): Promise<Array<string>> {

        let 
            result     : Array<string> = [],
            queryString: string        = `show tables`,
            queryResult: Array<any>    = await this.queryExecutor.query(queryString);

        result = this.queryParser.parseQueryResultToTableNames(queryResult);

        return result;
    }


    //* end point method
    public async findAll(queryObject: QueryData): Promise<Array<Record<string, any>>> {
        
        let 
            queryString: string = this.queryParser.parseSelect(queryObject),
            queryResult;

        console.log(queryString);

        queryResult = await this.queryExecutor.query(queryString);
        
        return queryResult[0];
    }


    /**
     * create database dreamorm;
     */
    public createDb(): void {

    }
    
}