import { InvalidParamError } from '@/shared/errors'
import { LoanData, LoanTypeCalculate, LoanTypeData } from './loan.types'
import { isValidNumber } from '@/shared/helpers/number.helper'
import { isValidCpf, isValidLocation, isValidString } from '@/shared/helpers/string.helper'
import { LOAN_TYPES } from '@/shared/constants'

export class LoanEntity {
  public readonly age: number
  public readonly cpf: string
  public readonly name: string
  public readonly income: number
  public readonly location: string

  constructor(input: LoanData) {
    const { age, cpf, name, income, location } = input

    this.ensureIsValidAge(age)
    this.ensureIsValidCpf(cpf)
    this.ensureIsValidName(name)
    this.ensureIsValidIncome(income)
    this.ensureIsValidLocation(location)

    this.age = age
    this.cpf = cpf
    this.name = name
    this.income = income
    this.location = location
  }

  private ensureIsValidAge(age: number): void {
    if (!isValidNumber(age)) throw new InvalidParamError('age')
  }

  private ensureIsValidCpf(cpf: string): void {
    if (!isValidCpf(cpf)) throw new InvalidParamError('cpf')
  }

  private ensureIsValidName(name: string): void {
    if (!isValidString(name)) throw new InvalidParamError('name')
  }

  private ensureIsValidIncome(income: number): void {
    if (!isValidNumber(income)) throw new InvalidParamError('income')
  }

  private ensureIsValidLocation(location: string): void {
    if (!isValidLocation(location)) throw new InvalidParamError('location')
  }

  public defineLoans(input: LoanTypeCalculate): LoanTypeData {
    const { name, age, income, location } = input

    if (income <= 3000 || (income <= 5000 && age < 30 && location === 'SP')) {
      return {
        customer: name,
        loans: LOAN_TYPES.filter(loan => loan.loanType === 'PERSONAL' || loan.loanType === 'GUARANTEED')
      }
    }

    return {
      customer: name,
      loans: LOAN_TYPES.filter(loan => loan.loanType === 'CONSIGNMENT')
    }
  }
}
