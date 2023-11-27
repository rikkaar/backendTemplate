import { PrismaClient } from '@prisma/client'


export const prisma = new PrismaClient({
    // datasourceUrl: ENV.DATABASE_URL,
})
