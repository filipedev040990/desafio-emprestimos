import { LoanEntity } from '@/domain/entities/loan.entity'
import { LoanData, LoanTypeData } from '@/domain/entities/loan.types'
import { GetLoansUseCaseInterface } from '@/domain/usecases/get-loans-usecase.interface'

export class GetLoansUseCase implements GetLoansUseCaseInterface {
  execute(input: LoanData): LoanTypeData {
    const loanEntity = new LoanEntity(input)

    return loanEntity.defineLoans({
      name: loanEntity.name,
      age: loanEntity.age,
      income: loanEntity.income,
      location: loanEntity.location
    })
  }
}
