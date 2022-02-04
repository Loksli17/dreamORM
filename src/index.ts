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


const dreamORM = new DreamOrm();

let connection: Connection = new Connection({
    dbName  : 'vueLearn',
    password: '1234',
    adapter : 'mysql',
    type    : 'pool',
});

let queryBuilder: QueryBuilder = new QueryBuilder(connection);

queryBuilder.getTableNames().then((names: Array<string>) => {
    console.log(names);
});


// queryBuilder.table('user').getFieldNames().then((value: Array<string>) => {
//     console.log(value);
// });


console.log('dreamORM in porgress');