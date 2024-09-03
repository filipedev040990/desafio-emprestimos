import { ControllerInterface, HttpRequest } from '@/domain/controllers/controller.interface'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      body: req?.body
    }

    const { statusCode, body } = controller.execute(input)
    const output = statusCode >= 200 && statusCode <= 499 ? body : { error: body.message }

    res.status(statusCode).json(output)
  }
}
