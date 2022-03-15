import { MongoClient, Db, Collection } from "mongodb";
import QueryExecutor       from "./QueryExecutor";


export default class MongoDbQueryExecutor implements QueryExecutor {

    private db_!: Promise<Db>;

    public constructor(type: 'connection' | 'pool' | 'cluster', connector: Promise<Db>) {
        this.db_ = connector;
    }

    public async query(): Promise<Db> {
        return this.db_;
    }
}