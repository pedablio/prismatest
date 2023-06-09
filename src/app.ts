import 'dotenv/config'
import fastify from 'fastify'
import { prisma } from './prisma'
import { subMinutes } from 'date-fns'
import { knexClient } from './knex'

const app = fastify({ ignoreTrailingSlash: true, caseSensitive: false })

app.get('/prisma-raw', async () => {
  const items = await prisma.$transaction((prismaTransaction) =>
    prismaTransaction.$queryRawUnsafe(
      `SELECT "id", "number", "createdAt", "sequential"
      FROM "plate_inspection"
      WHERE "plate" = $1
      AND "cityId" = $2
      AND "createdAt" + '300 minute' >= NOW()
      ORDER BY "createdAt" DESC`,
      generatePlate(),
      randomIntFromInterval(1, 10),
    ),
  )

  console.log(items)
})

app.get('/prisma', async () => {
  const items = await prisma.$transaction((prismaTransaction) =>
    prismaTransaction.plateInspection.findMany({
      where: {
        plate: generatePlate(),
        cityId: randomIntFromInterval(1, 10),
        createdAt: { gte: subMinutes(new Date(), 300) },
      },
      select: { id: true, number: true, createdAt: true, sequential: true },
      orderBy: { createdAt: 'desc' },
    }),
  )

  console.log(items)
})

app.get('/knex', async () => {
  const items = await knexClient.transaction((knexTransaction) =>
    knexTransaction
      .select('id', 'number', 'createdAt', 'sequential')
      .from('plate_inspection')
      .where('plate', generatePlate())
      .andWhere('cityId', randomIntFromInterval(1, 10))
      .andWhere(knexTransaction.raw(`"createdAt" + '300 minute' >= NOW()`))
      .orderBy('createdAt', 'desc'),
  )

  console.log(items)
})

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generatePlate() {
  let plate = ''
  const numbers = '0123456789'
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (let i = 0; i < 7; i++) {
    const characters = i < 3 ? letters : i === 4 ? letters + numbers : numbers
    plate += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return plate
}

export { app }
