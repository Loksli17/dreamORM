import { WhereParser } from "./WhereBuilder";


export default class MongoDbWhereParser implements WhereParser {

    // private associations: Record<string, (data: any) => void> = {
    //     'eq'      : (data: any) => this.parseEqual(data),
    //     'notEq'   : (data: any) => this.parseEqual(data, true),
    //     'orEq'    : (data: any) => this.addOr(this.parseEqual(data)),
    //     'notOrEq' : (data: any) => this.addOr(this.parseEqual(data, true)),
    //     'andEq'   : (data: any) => this.addAnd(this.parseEqual(data)),
    //     'notAndEq': (data: any) => this.addAnd(this.parseEqual(data, true)),
    // }
    

    parse(data: Array<[string, any]>): Record<string, any> {
        
        console.log('mongoWhereData: (=)))): ', data);
        return {};
    }

}