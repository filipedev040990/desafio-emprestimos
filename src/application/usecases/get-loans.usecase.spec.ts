import { LoanData, LoanTypeData } from '@/domain/entities/loan.types'
import { GetLoansUseCase } from './get-loans.usecase'
import { LoanEntity } from '@/domain/entities/loan.entity'

describe('GetLoansUseCase', () => {
  let sut: GetLoansUseCase
  let input: LoanData

  beforeEach(() => {
    sut = new GetLoansUseCase()
    input = {
      age: 50,
      name: 'Zé das Couves',
      cpf: '47852369885',
      income: 5000,
      location: 'SP'
    }
  })

  test('should make a correct LoanEntity', () => {
    const entity = new LoanEntity(input)
    expect(entity).toEqual({
      age: 50,
      name: 'Zé das Couves',
      cpf: '47852369885',
      income: 5000,
      location: 'SP'
    })
  })

  test('should call LoandEntity.defineLoanss once and with correct values', () => {
    const spy = jest.spyOn(LoanEntity.prototype, 'defineLoans')
    sut.execute(input)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      name: input.name,
      age: input.age,
      income: input.income,
      location: input.location
    })
    spy.mockRestore()
  })

  test('should return a correct output', () => {
    const mockLoanData: LoanTypeData = {
      customer: 'Zé das Couves',
      loans: [
        { loanType: 'PERSONAL', interestRate: 1000 },
        { loanType: 'GUARANTEED', interestRate: 2000 }
      ]
    }
    jest.spyOn(LoanEntity.prototype, 'defineLoans').mockReturnValueOnce(mockLoanData)

    const output = sut.execute(input)
    expect(output).toEqual(mockLoanData)
  })
})
