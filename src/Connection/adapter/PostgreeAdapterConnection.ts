import AdapterConnection from "./AdapterConnection";

/**
 * node-postgres has special props:
 *      - credentials
 *      - region
 *       
 */

export default class PostgreeAdapterConnection implements AdapterConnection{
    
    public create(): void {
        console.log('create');
    }

    public query(...args: any[]): void {
        console.log(args[0]);
    }
}

