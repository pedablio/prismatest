import { prisma } from '../../prisma'

export class ListCustomerUseCase {
  async execute() {
    const items = await prisma.customer.findMany({
      where: { createdAt: new Date() },
    })

    console.log(items)

    //  prisma.$queryRawUnsafe(
    //   `SELECT ${fields.map((field) => `"${field}"`).join(', ')}
    //   FROM "customer"
    //   WHERE "name" = $1
    //   AND "id" = $2
    //   AND "createdAt" + '${interval} minute' >= NOW()
    //   ORDER BY "createdAt" DESC`,
    //   plate,
    //   cityId,
    // )

    const anotherItems = await prisma.customer.findMany({
      where: { name: 'Test', id: 1, createdAt: { gte: new Date() } },
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, createdAt: true },
    })

    console.log(anotherItems)
  }
}
