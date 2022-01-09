import { prismaDisconnect, prismaMain } from "./prisma";

prismaMain()
        .finally(() => prismaDisconnect());