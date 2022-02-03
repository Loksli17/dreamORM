import AdapterConnection from "./AdapterConnection";


export default class MongoDbAdapterConnection implements AdapterConnection {
    
    public create(): void {
        console.log('create');
    }

    //! sqlString just fun for a now!!!!
    public query(): void {
        console.log('query');
    }
}

