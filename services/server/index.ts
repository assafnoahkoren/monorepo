import {createPrismaClient} from "@mymonorepo/database";

const prismaClient = createPrismaClient()

prismaClient.user.findMany().then(res => console.log(res))