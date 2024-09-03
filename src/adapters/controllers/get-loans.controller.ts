import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { GetLoansUseCaseInterface } from '@/domain/usecases/get-loans-usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class GetLoansController {
  constructor(private readonly usecase: GetLoansUseCaseInterface) {}
  execute(input: HttpRequest): HttpResponse {
    try {
      const output = this.usecase.execute(input?.body)
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
