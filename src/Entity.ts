
/**
 * ! think about how we should make Entity
 * ! Entity can be Decorator for Model class or it can be parent class
 * * i (loksli17) think that we should use Decorator case it has tools for custom our class without constructor
 */

import Query from "./Query/QueryBuilder"

export default class Entity {

}


//* ----------------- 1. decorator variant
const decoratorOption = () => {
    const entity = (): Function => {
        return <T extends { new (...args: any[]): {} }> (constructor: T) => {
            return class extends constructor {
                public query: Query = new Query();
            }
        }
    }

    entity()
    class DecoratorEntity {

    }

    const decoratorEntity = new DecoratorEntity();
    // ! we can't use this calling decoratorEntity.query;
}




//* ------------- 2 extends variant

const extendsOption = () => {
    class Entity {
        public query: Query = new Query();
    }

    class ExtendsEntity extends Entity {

    }

    const extendsEntity = new ExtendsEntity();
    extendsEntity.query.execute(`select * from 'gachi'`); 
}



//* ------------- 3 combine variant
const combineOption = () => {

    const entity = (): Function => {
        return <T extends { new (...args: any[]): {} }> (constructor: T) => {
            return class extends constructor {
                //! here we can make some private methods
            }
        }
    }
    
    class Entity {
        public query: Query = new Query();
    }

    entity()
    class ExtendsEntity extends Entity {

    }

    const extendsEntity = new ExtendsEntity();
    extendsEntity.query.execute(`select * from 'gachi'`); 
}
