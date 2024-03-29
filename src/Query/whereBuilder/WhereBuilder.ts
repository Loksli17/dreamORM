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

    //* In Future, i can think about hash-table for new good experience 
    //* with data structures
    private data_: Array<[string, any]> = []; 

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
        this.data_.push(['notLike', obj]);
        return this;
    }

    public andLike(obj: Record<string, string>): WhereBuilder {
        this.data_.push(['andLike', obj]);
        return this;
    }

    public notAndLike(obj: Record<string, string>): WhereBuilder {
        this.data_.push(['notAndLike', obj]);
        return this;
    }

    public orLike(obj: Record<string, string>): WhereBuilder {
        this.data_.push(['orLike', obj]);
        return this;
    }

    public notOrLike(obj: Record<string, string>): WhereBuilder {
        this.data_.push(['notOrlike', obj]);
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



    public between(obj: Record<string, Array<number | string>>){
        this.data_.push(['between', obj]);
        return this;
    }

    public notBetween(obj: Record<string, Array<number | string>>){
        this.data_.push(['notBetween', obj]);
        return this;
    }

    public orBetween(obj: Record<string, Array<number | string>>){
        this.data_.push(['orBetween', obj]);
        return this;
    }

    public notOrBetween(obj: Record<string, Array<number | string>>){
        this.data_.push(['notOrBetween', obj]);
        return this;
    }

    public andBetween(obj: Record<string, Array<number | string>>){
        this.data_.push(['andBetween', obj]);
        return this;
    }

    public notAndBetween(obj: Record<string, Array<number | string>>){
        this.data_.push(['notAndBetween', obj]);
        return this;
    }



    public less(obj: Record<string, number | string>){
        this.data_.push(['less', obj]);
        return this;
    }

    public notLess(obj: Record<string, number | string>){
        this.data_.push(['notLess', obj]);
        return this;
    }

    public orLess(obj: Record<string, number | string>){
        this.data_.push(['orLess', obj]);
        return this;
    }

    public notOrLess(obj: Record<string, number | string>){
        this.data_.push(['notOrLess', obj]);
        return this;
    }

    public andLess(obj: Record<string, number | string>){
        this.data_.push(['andLess', obj]);
        return this;
    }

    public notAndLess(obj: Record<string, number | string>){
        this.data_.push(['notAndLess', obj]);
        return this;
    }


    public lessEq(obj: Record<string, number | string>){
        this.data_.push(['lessEq', obj]);
        return this;
    }

    public notLessEq(obj: Record<string, number | string>){
        this.data_.push(['notLessEq', obj]);
        return this;
    }

    public orLessEq(obj: Record<string, number | string>){
        this.data_.push(['orLessEq', obj]);
        return this;
    }

    public notOrLessEq(obj: Record<string, number | string>){
        this.data_.push(['notOrLessEq', obj]);
        return this;
    }

    public andLessEq(obj: Record<string, number | string>){
        this.data_.push(['andLessEq', obj]);
        return this;
    }

    public notAndLessEq(obj: Record<string, number | string>){
        this.data_.push(['notAndLessEq', obj]);
        return this;
    }



    public more(obj: Record<string, number | string>){
        this.data_.push(['more', obj]);
        return this;
    }

    public notMore(obj: Record<string, number | string>){
        this.data_.push(['notMore', obj]);
        return this;
    }

    public orMore(obj: Record<string, number | string>){
        this.data_.push(['orMore', obj]);
        return this;
    }

    public notOrMore(obj: Record<string, number | string>){
        this.data_.push(['notOrMore', obj]);
        return this;
    }

    public andMore(obj: Record<string, number | string>){
        this.data_.push(['andMore', obj]);
        return this;
    }

    public notAndMore(obj: Record<string, number | string>){
        this.data_.push(['notAndMore', obj]);
        return this;
    }


    public moreEq(obj: Record<string, number | string>){
        this.data_.push(['moreEq', obj]);
        return this;
    }

    public notMoreEq(obj: Record<string, number | string>){
        this.data_.push(['notMoreEq', obj]);
        return this;
    }

    public orMoreEq(obj: Record<string, number | string>){
        this.data_.push(['orMoreEq', obj]);
        return this;
    }

    public notOrMoreEq(obj: Record<string, number | string>){
        this.data_.push(['notOrMoreEq', obj]);
        return this;
    }

    public andMoreEq(obj: Record<string, number | string>){
        this.data_.push(['andMoreEq', obj]);
        return this;
    }

    public notAndMoreEq(obj: Record<string, number | string>){
        this.data_.push(['notAndMoreEq', obj]);
        return this;
    }



    public regex(obj: Record<string, string>){
        this.data_.push(['regex', obj]);
        return this;
    }

    public notRegex(obj: Record<string, string>){
        this.data_.push(['notRegex', obj]);
        return this;
    }

    public orRegex(obj: Record<string, string>){
        this.data_.push(['orRegex', obj]);
        return this;
    }

    public notOrRegex(obj: Record<string, string>){
        this.data_.push(['notOrRegex', obj]);
        return this;
    }

    public andRegex(obj: Record<string, string>){
        this.data_.push(['andRegex', obj]);
        return this;
    }

    public notAndRegex(obj: Record<string, string>){
        this.data_.push(['notAndRegex', obj]);
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