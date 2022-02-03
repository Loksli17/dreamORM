import DreamOrm                          from './main';
import Connection, { ConnectionOptions } from './Connection/Connection';

/** 
 * ! plan for basic features
 * * 1. we should start from connection (at first it can be simple)
 * ? 2. reflex about Entities (think how Entities should be look like)
 * * 3. Alexander can start working on translation and Andrei can start working on Entities and Validation
 * ? 4. difficult queries
 * * 5. We can create simple filters for Entities and Associations
 */


const dreamORM = new DreamOrm();

let connection: Connection = new Connection({
    dbName  : 'vueLearn',
    password: '1234',
    adapter : 'mysql',
});

connection.query('select * from user limit 3');


console.log('dreamORM in porgress');