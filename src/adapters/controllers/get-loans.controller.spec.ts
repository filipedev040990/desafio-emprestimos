import { HttpRequest } from '@/domain/controllers/controller.interface'
import { GetLoansController } from './get-loans.controller'
import { mock } from 'jest-mock-extended'
import { GetLoansUseCaseInterface } from '@/domain/usecases/get-loans-usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { LoanTypeData } from '@/domain/entities/loan.types'

const usecase = mock<GetLoansUseCaseInterface>()

describe('GetLoansController', () => {
  let sut: GetLoansController
  let input: HttpRequest
  let fakeLoans: LoanTypeData

  beforeEach(() => {
    sut = new GetLoansController(usecase)
    input = {
      body: {
        age: 50,
        name: 'Joãozinho da Silva',
        cpf: '78965412332',
        income: 5000,
        location: 'MG'
      }
    }
    fakeLoans = {
      customer: 'Joãozinho da Silva',
      loans: [
        { loanType: 'PERSONAL', interestRate: 1000 },
        { loanType: 'GUARANTEED', interestRate: 2000 }
      ]
    }
    usecase.execute.mockReturnValue(fakeLoans)
  })

  test('should call GetLoansUseCase once and with correct values', () => {
    sut.execute(input)
    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith(input.body)
  })

  test('should return a correct output', () => {
    const output = sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: fakeLoans })
  })

  test('should return a correct error if CreateOwnerUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    usecase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
