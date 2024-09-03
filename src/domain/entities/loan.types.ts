export type LoanData = {
  age: number
  cpf: string
  name: string
  income: number
  location: string
}

export type LoanTypeCalculate = {
  name: string
  age: number
  income: number
  location: string
}

export type LoanTypeData = {
  customer: string
  loans: LoanTypesAndRate[]
}

export type LoanTypesAndRate = {
  loanType: string
  interestRate: number
}
