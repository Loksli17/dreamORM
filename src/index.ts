import DreamOrm     from './main';
import Connection   from './Connection/Connection';
import QueryBuilder from './Query/QueryBuilder';
import wb           from './Query/whereBuilder/WhereBuilder';

import Entity from './Entity/Entity';
import { PrimaryKey, Date, Int, Min, Max, UnsignedInt, Text, Unique, NotNull, Email, Boolean, Float, Phone } from './Entity/PropDecorators';


/** 
 * ! plan for basic features
 * * 1. we should start from connection (at first it can be simple)
 * ? 2. reflex about Entities (think how Entities should be look like)
 * * 3. Alexander can start working on translation and Andrei can start working on Entities and Validation
 * ? 4. difficult queries
 */
const orm: DreamOrm = new DreamOrm();


class Animal extends Entity {

    @PrimaryKey()
    @UnsignedInt()
    id?: number;

    @Text()
    name?: string;

    @Text({min: 4, max: 10})
    type?: string;
}


class Author extends Entity {

    @PrimaryKey()
    @UnsignedInt()
    id?: number;

    @Unique()
    @Text()
    name?: string;

    @Text({min: 4, max: 10})
    style?: string;
}


class Data extends Entity {

    @PrimaryKey()
    @UnsignedInt()
    id?: number;

    @Unique()
    @NotNull()
    @Text({min: 1, max: 255})
    title?: string;

    @Email()
    @NotNull()
    @Text({min: 8, max: 30})
    email?: string;

    @Phone(new RegExp('[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$', 'g'))
    @NotNull()
    @Text({min: 18, max: 18})
    phone?: string;

    @Boolean()
    isKek?: boolean;

    @Float()
    number?: number;
}


//? catch error with order of decorators
//? issue: if we wanna add @NonType decorator without @Type decorator we have error 
class test extends Entity {

    @PrimaryKey({autoIncrement: true})
    @Int()
    id?: string;

    @Text()
    field1?: string;

    @Min(10)
    @Max(20)
    @Int()
    field2?: number;

    @Int()
    field3?: number;

    @Date()
    date?: Date;
}



let tryMongo = async () => {

    let mongoConnection = new Connection({
        dbName  : 'dreamOrm',
        adapter : 'mongoDb',
        type    : 'connection',
        port    : 27017,
        host    : 'localhost',
        entities: [test],
    });

    orm.pushConnection(mongoConnection);

    let queryBuilderMongo: QueryBuilder = new QueryBuilder(mongoConnection);

    console.log(await queryBuilderMongo.table('test').getFieldsInfo());

    console.log(await queryBuilderMongo.table("test")
        .where(
            new wb().more({field2: 321})
        )
        .findAll()
    );


    // console.log(
    //     await queryBuilderMongo.table('test').where(new wb().eq({field1: 'test1'})).findOne()
    // );

    // console.log(
    //     await queryBuilderMongo.table('test').sort(['field2', 'desc']).findAll()
    // );

    console.log(await test.query().findOneById('62455290cbb655bd09d488ee'));

    let t: test = new test();

    // t.save();
}


let tryMySQL = async () => {

    // let mysqlConnection: Connection = new Connection({
    //     dbName  : 'vueLearn',
    //     password: '1234',
    //     adapter : 'mysql',
    //     type    : 'pool',
    //     entities: [Animal, Author],
    // });


    let mysqlConnection: Connection = new Connection({
        dbName  : 'orm',
        password: '1234',
        adapter : 'mysql',
        type    : 'pool',
        entities: [Data],
    });

    orm.pushConnection(mysqlConnection);

    let queryBuilder: QueryBuilder = new QueryBuilder(mysqlConnection);

    queryBuilder.createTableFromEntity(Data);

    // console.log(await queryBuilder.getTableNames());

    // console.log(await Animal.query().getFieldsInfo());

    // const data: Data = new Data();

    // data.title = "titl4";
    // data.phone = "18-83-57";
    // data.email = "kek@ail.com";
    // data.isKek = false;

    // console.log(await data.save());

    // const animal: Animal = new Animal()
    // animal.name = "object Opaaaaa pap papapap papapa";
    // animal.type = "Boy";

    // console.log('validation result: ', animal.validate());

    // const author: Author = new Author();
    
    // author.name = "Vova Misura";
    // author.style = ""; 

    // console.log('validation result: ', await author.save());

    // await Animal.query().insertOne(animal);

    // console.log(await Animal.query().findOneById(1));


    // console.log(await queryBuilder.table('animal').where({id: 2}).findOne());

    // await queryBuilder.table('article')
    //     .where(new wb().less({id: 7}).andBetween({date: ['2021-01-19', '2021-01-20']}))
    //     .fields(['id', 'date', 'title'])
    //     .findAll()

    // console.log(await Animal.query()
    //     .where(
    //         new wb()
    //             .in({id: [1, 2, 14, 56]})
    //             .andIn({name: ['Vaan', 'Marcus']})
    //             .orEq({id: 6})
    //             .orBracket(
    //                 new wb()
    //                 .eq({id: 5})
    //                 .orEq({id: 10})
    //                 .orBracket(
    //                     new wb()
    //                     .eq({id: 5})
    //                     .orIn({id: [6, 7, 8, 9]})
    //                 )
    //             )
    //     )
    //     .limit(3)
    //     .findAll()
    // );


    // console.log(await Animal.query().where({id: 21}).remove());

    // console.log(await queryBuilder.table("animal")
    //     .where(
    //         new wb()
    //             .bracket(
    //                 new wb().eq({name: 'Vaaan'}).andEq({id: 1})
    //             ).orBracket(
    //                 new wb().eq({name: 'Billy'}).andEq({type: 'full master'})
    //             ).orBracket(
    //                 new wb()
    //                     .bracket(
    //                         new wb().eq({name: 'Dima'}).orEq({name: 'Marcus'})
    //                     ).andBracket(
    //                         new wb().eq({type: 'poppol'}).orEq({type: 'type 1'})
    //                     )
    //             )
    //     )
    //     .findAll()
    // );

    // console.log(
    //     await queryBuilder.table('animal').where({name: 'Vaaan'}).findOne()
    // );

}



let main = async () => {

    // const animal: Animal = new Animal(mysqlConnection);

    await tryMongo();

    await tryMySQL();
}

main();