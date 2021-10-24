import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { showError } from '.'


export const registerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const schema = yup.object().shape({
    firstName: yup.string().min(1).max(20).required(),
    lastName: yup.string().min(1).max(20).required(),
    age: yup.number().min(0).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })

  await showError(req, res, next, schema)
}