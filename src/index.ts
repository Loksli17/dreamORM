import Query      from "./Query/Query";
import Connection from './Connection';

/** 
 * ! plan for basic features
 * * 1. we should start form connection (at first it can be simple)
 * ? 2. reflex about Entities (think how Entities should be look like)
 * * 3. Alexsandar can start working on translation and Andrei can start working on Entities and Validation
 * ? 4. difficult queries
 * * 5.  
 */

export default class DreamOrm {
    
    public connection: Connection = new Connection();
    public query     : Query      = new Query();
}

console.log('dreamORM in porgress');