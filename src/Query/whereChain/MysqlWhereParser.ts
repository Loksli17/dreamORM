import { WhereParser } from "./WhereChain";


export default class MysqlWhereParser implements WhereParser {

    //! fix returned type
    parse(data: Array<[string, any]>): string | Record<string, any> {
        
        let sql: string = '';

        return sql;
    }

}