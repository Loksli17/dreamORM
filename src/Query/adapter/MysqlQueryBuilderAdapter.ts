import Entity              from '../../Entity/Entity';
import MysqlQueryParser    from '../parser/MysqlQueryParser';
import { QueryData }       from '../QueryBuilder';
import MysqlQueryExecutor  from '../queryExecutor/MysqlQueryExecutor';
import WhereBuilder from '../whereBuilder/WhereBuilder';
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
    public async findAll(queryData: QueryData): Promise<Array<Record<string, any>>> {
        
        let 
            queryString: string = this.queryParser.parseSelect(queryData),
            queryResult;

        console.log(queryString);

        queryResult = await this.queryExecutor.query(queryString);
        
        return queryResult[0];
    }


    //* end point method
    public async findOne(queryData: QueryData): Promise<Record<string, any>> {
        
        let 
            queryString: string = this.queryParser.parseSelect(queryData),
            queryResult;

        console.log(queryString);

        queryResult = await this.queryExecutor.query(queryString);
        
        return queryResult[0][0];
    }


    /**
     * create database dreamorm;
     */
    public createDb(): void {

    }

    public async insertOne(queryData: QueryData, obj: Record<string, any> | Entity): Promise<any> {
        
        let
            queryString: string = this.queryParser.parseInsert(queryData, obj),
            queryResult: any;

        console.log(queryString);

        queryResult = await this.queryExecutor.query(queryString);

        return queryResult;
    }


    public async remove(queryData: QueryData): Promise<any> {
        
        let
            queryString: string = this.queryParser.parseRemove(queryData),
            queryResult: any;

        console.log(queryString);

        queryResult = await this.queryExecutor.query(queryString);

        return queryResult;
    }


    public async removeById(queryData: QueryData): Promise<any> {

        let
            queryString: string = this.queryParser.parseRemove(queryData),
            queryResult: any;

        console.log(queryString);

        queryResult = await this.queryExecutor.query(queryString);

        return queryResult;
    }
    
}