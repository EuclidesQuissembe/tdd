import { Router } from 'express'

import RegisterController from '@controllers/register.controller'
import { registerMiddleware } from '@middlewares/auth.middleware'

const router = Router()

const registerController = new RegisterController()

router.post('/register', registerMiddleware, registerController.handle)

export default router