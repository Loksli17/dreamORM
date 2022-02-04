import { mongoRun } from "./nativeModules/mongodb";
// import { prismaDisconnect, prismaMain } from "./otherORMs/prisma";

// prismaMain()
//         .finally(() => prismaDisconnect());

mongoRun();