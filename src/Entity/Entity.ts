import Connection       from "../Connection/Connection";
import QueryBuilder     from "../Query/QueryBuilder";
import DecoratorFactory from "../utils/DecoratorFactory";


const PrimaryKey = DecoratorFactory.createDecoratorBefore(() => {

});


export {
    PrimaryKey
}


export default class Entity {
    
    private queryBuilder: QueryBuilder | undefined;

    public constructor(connection: Connection){
        this.queryBuilder = new QueryBuilder(connection);
    }
    
}