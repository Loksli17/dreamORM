import { WithId, Db, Collection, CollectionInfo, FindCursor } from "mongodb";
import { QueryData }                                          from "../QueryBuilder";
import QueryExecutor                                          from "./QueryExecutor";



export default class MongoDbQueryExecutor implements QueryExecutor {

    private db!: Promise<Db>;

    private async bindCollection(collectionName: string | undefined): Promise<Collection<Document>> {
        const db: Db = (await this.db);
        if(collectionName == undefined) throw new Error("Unknow collection!");
        return db.collection(collectionName);
    }


    public constructor(type: 'connection' | 'pool' | 'cluster', connector: Promise<Db>) {
        this.db = connector;
    }


    public async query(): Promise<Db> {
        return this.db;
    }


    public async getCollectionsName(): Promise<(CollectionInfo | Pick<CollectionInfo, "name" | "type">)[]> {
        return await (await this.db).listCollections().toArray();
    }


    public async findOne(queryData: QueryData): Promise<WithId<Document> | null> {
        const collection: Collection<Document> = await this.bindCollection(queryData.tableName);
        return await collection.findOne();
    }


    public async findAll(queryData: QueryData): Promise<FindCursor<WithId<Document>>> {
        const collection: Collection<Document> = await this.bindCollection(queryData.tableName);
        const result: FindCursor<WithId<Document>> = await collection.find();
        return result;
    }

    
    public async remove(queryData: QueryData): Promise<any> {
        const collection: Collection<Document> = await this.bindCollection(queryData.tableName);
        // const result = await collection.deleteMany();
    }
}