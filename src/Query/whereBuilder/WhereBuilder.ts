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

    public notEq(obj: Record<string, number | boolean | string>): WhereBuilder {
        this.data_.push(['notEq', obj]);
        return this;
    }

    public orEq(obj: Record<string, number | boolean | string>): WhereBuilder {
        this.data_.push(['orEq', obj]);
        return this;
    }

    public notOrEq(obj: Record<string, number | boolean | string>): WhereBuilder {
        this.data_.push(['notOrEq', obj]);
        return this;
    }

    public andEq(obj: Record<string, number | boolean | string>): WhereBuilder {
        this.data_.push(['andEq', obj]);
        return this;
    }

    public notAndEq(obj: Record<string, number | boolean | string>): WhereBuilder {
        this.data_.push(['notOrEq', obj]);
        return this;
    }



    public like(obj: Record<string, string>): WhereBuilder {
        this.data_.push(['like', obj]);
        return this;
    }

    public notLike(obj: Record<string, string>): WhereBuilder {
        this.data_.push(['like', obj]);
        return this;
    }



    public in(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['in', obj]);
        return this;
    }

    public notIn(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['notIn', obj]);
        return this;
    }

    public orIn(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['orIn', obj]);
        return this;
    }

    public notOrIn(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['notOrIn', obj]);
        return this;
    }

    public andIn(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['andIn', obj]);
        return this;
    }

    public notAndIn(obj: Record<string, Array<number | string>>): WhereBuilder {
        this.data_.push(['notAndIn', obj]);
        return this;
    }


    public bracket(whereBuilder: WhereBuilder): WhereBuilder {
        this.data_.push(['bracket', whereBuilder]);
        return this;
    }

    public orBracket(whereBuilder: WhereBuilder): WhereBuilder {
        this.data_.push(['orBracket', whereBuilder]);
        return this;
    }

    public andBracket(whereBuilder: WhereBuilder): WhereBuilder {
        this.data_.push(['andBracket', whereBuilder]);
        return this;
    }

}