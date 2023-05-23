import { ListCustomerUseCase } from './ListCustomerUseCase'

export class ListCustomerController {
  constructor(private listCustomerUseCase: ListCustomerUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle() {
    const data = await this.listCustomerUseCase.execute()
    return data
  }
}
