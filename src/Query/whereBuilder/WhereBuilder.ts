import MysqlWhereParser   from "./MysqlWhereParser";
import MongoDbWhereParser from "./MongoDbWhereParser";


export interface WhereParser {

    parse(data: Array<[string, any]>): string | Record<string, any>;

}


// export abstract class WhereBuilderParserFactory {

//     private static parserAssociates: Record<string, any> = {
//         mysql  : () => { return new MysqlWhereParser() },
//         mongoDb: () => { return new MongoDbWhereParser()}
//     };

//     public static create(type: 'mysql' | 'mongoDb'): WhereParser {
//         return WhereBuilderParserFactory.parserAssociates[type]();
//     }
// }



export default class WhereBuilder {

    private data_: Array<[string, any]> = []; //? think 

    constructor(){

    }

    public get data(): Array<[string, any]> {
        return this.data_;
    }


    public eq(obj: Record<string, number | boolean | string>): WhereBuilder {
        this.data_.push(['eq', obj]);
        return this;
    }


    public orEq(obj: Record<string, number | boolean | string>): WhereBuilder {
        this.data_.push(['orEq', obj]);
        return this;
    }


    public andEq(obj: Record<string, number | boolean | string>): WhereBuilder {
        this.data_.push(['andEq', obj]);
        return this;
    }


    public like(obj: Record<string, string>): WhereBuilder {
        this.data_.push(['like', obj]);
        return this;
    }


    public in(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['in', obj]);
        return this;
    }


    public orIn(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['orIn', obj]);
        return this;
    }

    public andIn(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['andIn', obj]);
        return this;
    }


    public bracket(whereBuilder: WhereBuilder): WhereBuilder {
        
        return this;
    }

}