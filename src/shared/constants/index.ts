import { LoanTypeData } from '@/domain/entities/loan.types'

export const LOAN_TYPES: LoanTypeData[] = [
  {
    loanType: 'PERSONAL',
    interestRate: 4
  },
  {
    loanType: 'GUARANTEED',
    interestRate: 3
  },
  {
    loanType: 'CONSIGNMENT',
    interestRate: 2
  }
]
