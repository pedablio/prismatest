import 'dotenv/config'
import fastify from 'fastify'

import { Prisma } from '@prisma/client'
import { registerRoutes } from './routes'

Prisma.Decimal.prototype.toJSON = function () {
  return this.toNumber() as unknown as string
}

const app = fastify({ ignoreTrailingSlash: true, caseSensitive: false })

app.register(registerRoutes, { prefix: '/' })

export { app }
