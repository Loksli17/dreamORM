import DreamOrm     from './main';
import Connection   from './Connection/Connection';
import QueryBuilder from './Query/QueryBuilder';

import Entity, { MinLength, PrimaryKey, Prop } from './Entity/Entity';


/** 
 * ! plan for basic features
 * * 1. we should start from connection (at first it can be simple)
 * ? 2. reflex about Entities (think how Entities should be look like)
 * * 3. Alexander can start working on translation and Andrei can start working on Entities and Validation
 * ? 4. difficult queries
 */


class Animal extends Entity {

    @PrimaryKey()
    id?: number;

    @Prop()
    @MinLength(5)
    name?: string;

    @Prop()
    type?: string;
}


let tryMongo = async () => {

    let mongoConnection = new Connection({
        dbName : 'dreamOrm',
        adapter: 'mongoDb',
        type   : 'connection',
        port   : 27017,
        host   : 'localhost',
    });

    let queryBuilderMongo: QueryBuilder = new QueryBuilder(mongoConnection);

    console.log(await queryBuilderMongo.table('test').getFieldsInfo())

    console.log(await queryBuilderMongo.table("test").findAll());
}


let tryMySQL = async () => {

    let mysqlConnection: Connection = new Connection({
        dbName  : 'vueLearn',
        password: '1234',
        adapter : 'mysql',
        type    : 'pool',
    });

    let queryBuilder: QueryBuilder = new QueryBuilder(mysqlConnection);

    console.log(await queryBuilder.table('animal').getFieldsInfo());

    console.log(await queryBuilder.table("animal")
                        .fields(['id', 'type'])
                        .offset(4)
                        .limit(3)
                        .findAll()
                );
}



let main = async () => {

    const dreamORM = new DreamOrm();

    // const animal: Animal = new Animal(mysqlConnection);

    // tryMongo();

    tryMySQL();
}

main();