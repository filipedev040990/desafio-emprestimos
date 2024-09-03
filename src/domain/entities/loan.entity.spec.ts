import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { LoanEntity } from './loan.entity'

describe('LoanEntity', () => {
  test('should throw if a invalid age is provided', () => {
    expect(
      () =>
        new LoanEntity({
          age: -1,
          cpf: '275.484.389-23',
          name: 'Vuxaywua Zukiagou',
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('age'))

    expect(
      () =>
        new LoanEntity({
          age: '50' as any,
          cpf: '275.484.389-23',
          name: 'Vuxaywua Zukiagou',
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('age'))

    expect(
      () =>
        new LoanEntity({
          age: undefined as any,
          cpf: '275.484.389-23',
          name: 'Vuxaywua Zukiagou',
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('age'))
  })

  test('should throw if a invalid cpf is provided', () => {
    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: undefined as any,
          name: 'Vuxaywua Zukiagou',
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('cpf'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.3',
          name: 'Vuxaywua Zukiagou',
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('cpf'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: 'ABCVDslk123',
          name: 'Vuxaywua Zukiagou',
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('cpf'))
  })

  test('should throw if a invalid name is provided', () => {
    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: undefined as any,
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('name'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: '',
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('name'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: 12313 as any,
          income: 7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('name'))
  })

  test('should throw if a invalid income is provided', () => {
    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: 'João da Silva',
          income: null as any,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('income'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: 'João da Silva',
          income: '7000.0' as any,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('income'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: 'João da Silva',
          income: -7000.0,
          location: 'SP'
        })
    ).toThrowError(new InvalidParamError('income'))
  })

  test('should throw if a invalid location is provided', () => {
    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: 'João da Silva',
          income: 7000.0,
          location: undefined as any
        })
    ).toThrowError(new InvalidParamError('location'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: 'João da Silva',
          income: 7000.0,
          location: ''
        })
    ).toThrowError(new InvalidParamError('location'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: 'João da Silva',
          income: 7000.0,
          location: 'ABC'
        })
    ).toThrowError(new InvalidParamError('location'))

    expect(
      () =>
        new LoanEntity({
          age: 50,
          cpf: '275.484.389-23',
          name: 'João da Silva',
          income: 7000.0,
          location: 500 as any
        })
    ).toThrowError(new InvalidParamError('location'))
  })

  test('should return PERSONAL AND GUARANTEED loan types if income is less than 3000', () => {
    const loan: any = new LoanEntity({
      age: 50,
      cpf: '275.484.389-23',
      name: 'João da Silva',
      income: 2999,
      location: 'MG'
    })

    let loans = loan.defineLoan({ age: loan.age, income: loan.income, location: loan.location })

    expect(loans).toEqual([
      {
        loanType: 'PERSONAL',
        interestRate: 4
      },
      {
        loanType: 'GUARANTEED',
        interestRate: 3
      }
    ])
  })

  test('should return PERSONAL AND GUARANTEED loan types', () => {
    const loan: any = new LoanEntity({
      age: 29,
      cpf: '275.484.389-23',
      name: 'João da Silva',
      income: 4999,
      location: 'SP'
    })

    let loans = loan.defineLoan({ age: loan.age, income: loan.income, location: loan.location })

    expect(loans).toEqual([
      {
        loanType: 'PERSONAL',
        interestRate: 4
      },
      {
        loanType: 'GUARANTEED',
        interestRate: 3
      }
    ])
  })

  test('should return CONSIGNMENT loan type', () => {
    const loan: any = new LoanEntity({
      age: 50,
      cpf: '275.484.389-23',
      name: 'João da Silva',
      income: 5001,
      location: 'MG'
    })

    let loans = loan.defineLoan({ age: loan.age, income: loan.income, location: loan.location })

    expect(loans).toEqual([
      {
        loanType: 'CONSIGNMENT',
        interestRate: 2
      }
    ])
  })
})
