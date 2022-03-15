import DreamOrm     from './main';
import Connection   from './Connection/Connection';
import QueryBuilder from './Query/QueryBuilder';

/** 
 * ! plan for basic features
 * * 1. we should start from connection (at first it can be simple)
 * ? 2. reflex about Entities (think how Entities should be look like)
 * * 3. Alexander can start working on translation and Andrei can start working on Entities and Validation
 * ? 4. difficult queries
 */


let main = async () => {

    const dreamORM = new DreamOrm();

    let mysqlConnection: Connection = new Connection({
        dbName  : 'vueLearn',
        password: '1234',
        adapter : 'mysql',
        type    : 'pool',
    });

    let queryBuilder: QueryBuilder = new QueryBuilder(mysqlConnection);

    console.log(await queryBuilder.getTableNames());

    console.log(await queryBuilder.table("animal").getFieldInfo());


    let mongoConnection = new Connection({
        dbName : 'dreamORM',
        adapter: 'mongoDb',
        type   : 'connection',
        port   : 27017,
        host   : 'localhost',
    });
}


main();

console.log('dreamORM in porgress');