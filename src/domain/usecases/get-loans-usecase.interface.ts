import { LoanData, LoanTypeData } from '../entities/loan.types'

export interface GetLoansUseCaseInterface {
  execute: (input: LoanData) => LoanTypeData
}
