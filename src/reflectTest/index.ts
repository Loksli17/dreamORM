import { getType, Type } from "tst-reflect";
import Point from "./Point"


function printTypeProperties<TType>() 
{
    const type = getType<TType>(); // <<== get type of generic TType
    
    console.log(type.getProperties().map(prop => prop.name + ": " + prop.type.name).join("\n"));

    console.log(type.getMethods()
                    .map(method => 
                        `${method.name}(${method.getParameters().map(p => `${p.name}: ${p.type.name}`)}): ${method.returnType.name}`));
}

printTypeProperties<Point>();

// const typeofClass = getType<Point>();

// console.log(typeofClass.name);
// console.log(typeofClass.getProperties().map(p => `${p.name}: ${p.type}`));
// console.log(typeofClass.getMethods()
//                 .map(p => 
//                     `${p.name}(${p.getParameters()
//                                     .map(p => `${p.name}: ${p.type}`)
//                                     .join(", ")}): ${p.returnType.name}`));
