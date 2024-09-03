import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { getLoansFactoryController } from '../factories/get-loans.factory'

const router = Router()

router.post('/customer-loans', expressRouteAdapter(getLoansFactoryController()))

export { router }
