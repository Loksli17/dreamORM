export default class DecoratorFactory { 

    public static createMethodDecoratorAfter(handler: (data: any) => any){

        return (target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

            const method = descriptor.value;

            descriptor.value = async function(...args: any[]){
                const data = await method.apply(this, args);
                return handler(data);
            }

            return descriptor;
        }
    }


    public static createMethodDecoratorBefore(handler: () => void){

        return (target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

            const method = descriptor.value;

            descriptor.value = async function(...args: any[]){
                handler();
                const data = await method.apply(this, args);
                return data;
            }

            return descriptor;
        }
    }


    // public static createPropDecorator(handler: () => void) {

    // }
}