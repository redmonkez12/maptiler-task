import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line vars-on-top, no-var, init-declarations
    var cachedPrisma: PrismaClient;
}

// eslint-disable-next-line init-declarations
let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}

export const db = prisma;
