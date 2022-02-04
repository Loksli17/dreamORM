import Connection                                          from "./../Connection/Connection";
import Entity                                              from "../Entity";
import QueryBuilderAdapter, { QueryBuilderAdapterFactory } from "./adapter/QueryBuilderAdapter";


export default class QueryBuilder {


    private queryBuilderAdapter: QueryBuilderAdapter;
    private connection         : Connection;


    public constructor(connection: Connection) {
        this.connection = connection;
        this.queryBuilderAdapter = QueryBuilderAdapterFactory.create(connection.adapter as 'mysql', this.connection.queryExecutor); //! fun for now
    }

    public table(name: string): QueryBuilder {
        this.queryBuilderAdapter.table(name);
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


    public select(): QueryBuilder {
        return this;
    }

    public where(): QueryBuilder {
        return this;
    }


    public having(): QueryBuilder {
        return this;
    }


    public orderBy(): QueryBuilder {
        return this;
    }


    public limit(): QueryBuilder {
        return this;
    }


    public offset(): QueryBuilder {
        return this;
    }


    public take(): QueryBuilder {
        return this.limit();
    }

    
    public skip(): QueryBuilder {
        return this.offset();
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

    public find(): Array<Entity> {
        return [new Entity()];
    }


    public getFieldNames(): Array<string> {
        this.queryBuilderAdapter.getFieldNames();
        return [];
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