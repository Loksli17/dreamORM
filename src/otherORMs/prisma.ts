import { PrismaClient } from "@prisma/client";

// ! To generate a new client use 
// ! npx prisma generate --schema=./src/otherORMs/prisma/schema.prisma

const prisma = new PrismaClient();

async function prismaMain() {
    await prisma.$connect();

    await prisma.user.create({
        data: {
            name: "Bob",
            posts: {
                create: {
                    title: "Cool title",
                    content: "Not so cool"
                }
            }
        }
    });

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true
        }
    });

    const firstUser = allUsers[0];
    console.log(allUsers);
    console.log(firstUser);
}

const prismaDisconnect = async () => {
    await prisma.$disconnect();
}

export { prismaMain, prismaDisconnect }