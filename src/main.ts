import Query      from "./Query/QueryBuilder";
import Connection from './Connection/Connection';

/**
 * ! Class DreamOrm will be Entry Point
 * * this class must be a Singlton?
 */

class DreamOrm {
    
    public static instance: DreamOrm;

    // ?this variant
    private constructor(){

    }

    public static get Instance(): DreamOrm {
        return this.instance || (this.instance = new this);
    }
}


export default DreamOrm.Instance;