import { PrismaClient, Employee as PrismaEmployee } from '@prisma/client';

const prisma = new PrismaClient();

export type Employee = PrismaEmployee;

export default prisma.employee;