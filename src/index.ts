import DreamOrm     from './main';
import Connection   from './Connection/Connection';
import QueryBuilder from './Query/QueryBuilder';
import wb           from './Query/whereBuilder/WhereBuilder';

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
        .where(
            new wb()
                .bracket(
                    new wb().eq({field1: 'test1'}).andEq({field2: 123})
                ).andBracket(
                    new wb().eq({field1: 'test2'}).andEq({field3: 56.78})
                )
                
                // .notEq({field1: 'test1'})
                // .notAndEq({field1: 'test2'})
                // .notAndEq({field1: 'test3'})
                // .orEq({fileld3: 322})
        )
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

    console.log(await queryBuilder.getTableNames());

    console.log(await queryBuilder.table('animal').getFieldsInfo());

    console.log(await queryBuilder.table('animal').where({id: 2}).findOne());

    // console.log(await queryBuilder.table('article')
    //     .where(new wb().less({id: 7}).andBetween({date: ['2021-01-19', '2021-01-20']}))
    //     .fields(['id', 'date', 'title'])
    //     .findAll()
    // );

    // console.log(await queryBuilder.table("animal")
    //     .where(
    //         new WhereBuilder()
    //             .in({id: [1, 2, 14, 56]})
    //             .andIn({name: ['Vaan', 'Marcus']})
    //             .orEq({id: 6})
    //             .orBracket(
    //                 new WhereBuilder()
    //                 .eq({id: 5})
    //                 .orEq({id: 10})
    //                 .orBracket(
    //                     new WhereBuilder()
    //                     .eq({id: 5})
    //                     .orIn({id: [6, 7, 8, 9]})
    //                 )
    //             )
    //     )
    //     .limit(3)
    //     .findAll()
    // );


}



let main = async () => {

    const dreamORM = new DreamOrm();

    // const animal: Animal = new Animal(mysqlConnection);

    tryMongo();

    // tryMySQL();
}

main();