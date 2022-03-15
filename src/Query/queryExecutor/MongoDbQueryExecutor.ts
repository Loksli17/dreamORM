import { MongoClient, Db, Collection } from "mongodb";
import QueryExecutor       from "./QueryExecutor";


export default class MongoDbQueryExecutor implements QueryExecutor {

    private db_!: Promise<Db>;

    public constructor(type: 'connection' | 'pool' | 'cluster', connector: Promise<Db>) {
        this.db_ = connector;
    }


    //* we should think about QueryObjectParser for mongo
    public async query(queryParams: Record<string, any>) {
        
        const db: Db = await this.db_;
        const collection: Collection<Document> = db.collection(queryParams.collection);
    }
}