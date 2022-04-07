import 'reflect-metadata';


const Prop = () => {

    return (target: Object, propertyKey: string) => {

        const props: Array<string> = Reflect.getOwnMetadata('props', target) || [];

        if(!props.includes(propertyKey)) props.push(propertyKey);

        Reflect.defineMetadata('props', props, target);
    }
}


class Parent {

    protected get schema(): Array<string> {
        
        let props: Array<string> = [];

        let target: Object = Object.getPrototypeOf(this);

        while(target != Object.prototype) {
            let childFields = Reflect.getOwnMetadata('props', target) || [];
            props.push(...childFields);
            target = Object.getPrototypeOf(target);
        }

        return props;
    }

    public save(): void {

        const schema: Array<string> = this.schema;

        setTimeout(() => {
            console.log('saving....');
            console.log(schema);
        }, 2000);
    }
}


class Test extends Parent {

    @Prop()
    public field1?: string;

    @Prop()
    public field2?: string;

    @Prop()
    public filed3?: string;
    
}


let test: Test = new Test();

console.log('start save')
test.save();