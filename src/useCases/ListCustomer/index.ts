import { ListCustomerController } from './ListCustomerController'
import { ListCustomerUseCase } from './ListCustomerUseCase'

const listCustomerUseCase = new ListCustomerUseCase()
const listCustomerController = new ListCustomerController(listCustomerUseCase)

export { listCustomerController }
