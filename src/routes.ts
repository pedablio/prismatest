import { FastifyPluginCallback } from 'fastify'
import { listCustomerController } from './useCases/ListCustomer'

export const registerRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', listCustomerController.handle)

  done()
}
