import DreamOrm     from './main';
import Connection   from './Connection/Connection';
import QueryBuilder from './Query/QueryBuilder';
import WhereChain   from './Query/whereChain/WhereChain';

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

    console.log(await queryBuilderMongo.table("test")
        .limit(5)
        .skip(2)
        .fields(['field1', 'field2'])
        .findAll()
    );
}


let tryMySQL = async () => {

    let mysqlConnection: Connection = new Connection({
        dbName  : 'vueLearn',
        password: '1234',
        adapter : 'mysql',
        type    : 'pool',
    });

    let queryBuilder: QueryBuilder = new QueryBuilder(mysqlConnection);

    await queryBuilder.getTableNames();

    // console.log(await queryBuilder.table('animal').getFieldsInfo());

    console.log(await queryBuilder.table("animal")
        .where(
            new WhereChain()
                .in({id: [1, 2, 14, 56]})
                .andIn({name: [1, 5, 6, 10, 12]})
                // .equal({id: 14})
                .orEq({id: 6})
                // .and({id: 8})
                // .like({name: 'Holodidov'})
                // 
                // .bracket(
                //     new WhereChain()
                //     .equal({id: 5})
                //     .or({id: 10})
                // )

        )
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