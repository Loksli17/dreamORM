import Connection                                          from "./../Connection/Connection";
import Entity                                              from "../Entity";
import QueryBuilderAdapter, { QueryBuilderAdapterFactory } from "./adapter/QueryBuilderAdapter";
import WhereChain                                          from "./whereChain/WhereChain";


export interface QueryData {

    limit? : number;
    offset?: number;

    where?: Record<string, any>;
    
    fields?: Array<string>;
    
    sort?: {column: string, order: 'DESC' | 'ASC'};

    tableName?: string;
}



//! add queryData clear

export default class QueryBuilder {


    private queryBuilderAdapter: QueryBuilderAdapter;
    private connection         : Connection;
    private queryData          : QueryData = {};


    public constructor(connection: Connection) {
        this.connection = connection;
        this.queryBuilderAdapter = QueryBuilderAdapterFactory.create(connection.adapter as 'mysql' | 'mongoDb', this.connection.queryExecutor); //! fun for now
    }


    public table(name: string): QueryBuilder {
        this.queryData.tableName = name;
        return this;
    }
    

    //! start from this method
    public execute(QueryBuilder: string): any {
        
    }


    public createTable(): any {

    }


    public createDatebase(): any {

    }


    // public subQueryBuilder(): QueryBuilder {
    //     return new QueryBuilder(this.pool);
    // }


    public fields(fields: Array<string>): QueryBuilder {
        this.queryData.fields = fields;
        return this;
    }


    public where(params: Record<string, string | number | boolean> | WhereChain): QueryBuilder {
        this.queryData.where = params;
        return this;
    }


    public sort(): QueryBuilder {
        return this;
    }


    public limit(value: number): QueryBuilder {
        this.queryData.limit = value;
        return this;
    }


    public offset(value: number): QueryBuilder {
        this.queryData.offset = value;
        return this;
    }


    public take(value: number): QueryBuilder {
        return this.limit(value);
    }

    
    public skip(value: number): QueryBuilder {
        return this.offset(value);
    }

    //todo think about another name?
    public include(): QueryBuilder {
        return this;
    }


    //* group of end point methods
    public get(): Entity | Array<Entity> | Record<string, any> | Array<Record<string, any>> {
        return new Entity();
    } 

    public textQueryBuilder(): string {
        return `select * from 'azaza'`;
    }


    public findById(): Entity {
        return new Entity();
    }

    public findOne(): Entity {
        return new Entity();
    }


    //* end point method
    public async findAll(): Promise<Array<Record<string, any>>> {
        return await this.queryBuilderAdapter.findAll(this.queryData);
    }


    //* end point method
    public async getFieldsInfo(): Promise<Array<Record<string, any>>> {
        let result: Array<Record<string, any>> = await this.queryBuilderAdapter.getFieldsInfo(this.queryData);
        return result;
    }


    //* end point method
    public async getTableNames(): Promise<Array<string>> {
        let result: Array<string> = await this.queryBuilderAdapter.getTableNames();
        return result;
    } 


    public removeOne(): void {

    }

    public removeAll(): void {

    }


    //? void or new database record?
    public static save(): void {

    }

    //? void or new database record?
    public static update(): void {

    }
}