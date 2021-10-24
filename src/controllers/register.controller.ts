import { Request, Response } from 'express'
import RegisterService from '@services/register.service'

interface IRegisterBody {
  firstName: string
  lastName: string
  age: number
  email: string
  password: string
}

export default class RegisterController {
  async handle(req: Request<any, any, IRegisterBody>, res: Response) {
    const registerService = new RegisterService()

    try {
      const user = await registerService.execute({ ...req.body })

      return res.status(201).json({
        success: true,
        data: user
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }
}