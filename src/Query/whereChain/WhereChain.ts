import MysqlWhereParser   from "./MysqlWhereParser";
import MongoDbWhereParser from "./MongoDbWhereParser";


export interface WhereParser {

    parse(data: Array<[string, any]>): string | Record<string, any>;

}


// export abstract class WhereChainParserFactory {

//     private static parserAssociates: Record<string, any> = {
//         mysql  : () => { return new MysqlWhereParser() },
//         mongoDb: () => { return new MongoDbWhereParser()}
//     };

//     public static create(type: 'mysql' | 'mongoDb'): WhereParser {
//         return WhereChainParserFactory.parserAssociates[type]();
//     }
// }



export default class WhereChain {

    private data_: Array<[string, any]> = []; //? think 

    constructor(){

    }

    public get data(): Array<[string, any]> {
        return this.data_;
    }


    public equal(obj: Record<string, number | boolean | string>): WhereChain {
        this.data_.push(['equal', obj]);
        return this;
    }


    public or(obj: Record<string, number | boolean | string>): WhereChain {
        this.data_.push(['or', obj]);
        return this;
    }


    public and(obj: Record<string, number | boolean | string>): WhereChain {
        this.data_.push(['and', obj]);
        return this;
    }


    public like(obj: Record<string, string>): WhereChain {
        this.data_.push(['like', obj]);
        return this;
    }


    public in(obj: Record<string, Array<number | string>>): WhereChain {
        this.data_.push(['in', obj]);
        return this;
    }


    public orIn(obj: Record<string, Array<number | string>>): WhereChain {
        this.data_.push(['orIn', obj]);
        return this;
    }

    public andIn(obj: Record<string, Array<number | string>>): WhereChain {
        this.data_.push(['andIn', obj]);
        return this;
    }


    public bracket(whereChain: WhereChain): WhereChain {
        return this;
    }

}