import { GetLoansController } from '@/adapters/controllers/get-loans.controller'
import { GetLoansUseCase } from '@/application/usecases/get-loans.usecase'

export const getLoansFactoryController = (): GetLoansController => {
  return new GetLoansController(new GetLoansUseCase())
}
