import Connection                                          from "./../Connection/Connection";
import Entity                                              from "../Entity";
import QueryBuilderAdapter, { QueryBuilderAdapterFactory } from "./adapter/QueryBuilderAdapter";
import WhereBuilder                                        from "./whereBuilder/WhereBuilder";


export interface QueryData {

    limit? : number;
    offset?: number;

    where?: Record<string, any>; //! fix this type
    
    fields?: Array<string>;
    
    sort?: {column: string, order?: 'desc' | 'asc'} | [string, 'desc' | 'asc'];

    tableName?: string;
}


type whereRecord =  string | number | boolean;




//! add queryData clear
export default class QueryBuilder {


    private queryBuilderAdapter: QueryBuilderAdapter;
    private connection         : Connection;
    private queryData          : QueryData = {};

    private reset(): void {
        this.queryData = {};
    }
    


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


    //* add here all Fileds params and fix empty param
    public fields(fields: Array<string>): QueryBuilder {
        this.queryData.fields = fields;
        return this;
    }


    public where(params: Record<string, whereRecord | Array<whereRecord>> | WhereBuilder): QueryBuilder {
        this.queryData.where = params; 
        return this;
    }


    public sort(params: [string, 'desc' | 'asc'] | {column: string, order?: 'desc' | 'asc'}): QueryBuilder {
        this.queryData.sort = params;
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


    public async findOneById(id: number | string): Promise<Record<string, any>> {
        this.queryData.where = new WhereBuilder().eq({id: id});
        const result: Record<string, any> = await this.queryBuilderAdapter.findOne(this.queryData);
        this.reset();
        return result;
    }


    //* end point method
    public async findOne(): Promise<Record<string, any>> {
        this.queryData.limit = 1;
        const result: Record<string, any> = await this.queryBuilderAdapter.findOne(this.queryData);
        this.reset();
        return result;
    }


    //* end point method
    public async findAll(): Promise<Array<Record<string, any>>> {
        const result: Array<Record<string, any>> = await this.queryBuilderAdapter.findAll(this.queryData);
        this.reset();
        return result;
    }


    //* end point method
    public async getFieldsInfo(): Promise<Array<Record<string, any>>> {
        let result: Array<Record<string, any>> = await this.queryBuilderAdapter.getFieldsInfo(this.queryData);
        this.reset();
        return result;
    }


    //* end point method
    public async getTableNames(): Promise<Array<string>> {
        let result: Array<string> = await this.queryBuilderAdapter.getTableNames();
        this.reset();
        return result;
    } 


    //* end point method
    public async removeById(id: number | string): Promise<any> {
        this.queryData.where = new WhereBuilder().eq({id: id});
        let result: any = await this.queryBuilderAdapter.removeById(this.queryData);
        this.reset();
        return result;
    }


    //* end point method
    public async remove(): Promise<any> {
        let result: any = await this.queryBuilderAdapter.remove(this.queryData);
        this.reset();
        return result;
    }


    //? void or new database record?
    public async insert(): Promise<any> {
        
    }


    public async insertOne(obj: Record<string, any> | Entity): Promise<any> {
        let result: any = await this.queryBuilderAdapter.insertOne(this.queryData, obj);
        return result;
    }

    //? void or new database record?
    public update(): void {

    }
}