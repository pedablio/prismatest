import { PrismaClient } from '@prisma/client'
import { drizzle } from 'drizzle-orm/prisma/pg'

export const prisma = new PrismaClient().$extends(drizzle())
