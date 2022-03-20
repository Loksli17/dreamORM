import { WhereParser } from "./WhereChain";


export default class MongoDbWhereParser implements WhereParser {
    
    parse(): string | Record<string, any> {
        throw new Error("Method not implemented.");
    }

}