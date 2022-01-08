import Entity from "../Entity";

export default class Query {

    //! start from this method
    public execute(query: string): any {
        
    }


    public subQuery(): Query {
        return new Query();
    }


    public select(): Query {
        return this;
    }

    public where(): Query {
        return this;
    }


    public having(): Query {
        return this;
    }


    public orderBy(): Query {
        return this;
    }


    public limit(): Query {
        return this;
    }


    public offset(): Query {
        return this;
    }


    public take(): Query {
        return this.limit();
    }

    
    public skip(): Query {
        return this.offset();
    }

    //todo think about another name?
    public include(): Query {
        return this;
    }


    //* group of end point methods
    public get(): Entity | Array<Entity> | Record<string, any> | Array<Record<string, any>> {
        return new Entity();
    } 

    public textQuery(): string {
        return `select * from 'azaza'`;
    }


    public findById(): Entity {
        return new Entity();
    }

    public findOne(): Entity {
        return new Entity();
    }

    public find(): Array<Entity> {
        return [new Entity()];
    }


    public removeOne(): void {

    }

    public removeAll(): void {

    }


    //? void or new database record?
    public static save(): void {

    }

    //? void or new database record?
    public static update(): void {

    }
}