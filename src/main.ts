import Query      from "./Query/Query";
import Connection from './Connection/Connection';


export default class DreamOrm {
    
    public connection: Connection = new Connection();
    public query     : Query      = new Query();
}