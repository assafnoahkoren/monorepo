import prisma from '@prisma/client';

export const createPrismaClient = () => new prisma.PrismaClient();