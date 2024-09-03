import { LoanTypesAndRate } from '@/domain/entities/loan.types'

export const LOAN_TYPES: LoanTypesAndRate[] = [
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
