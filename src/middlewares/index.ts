import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'


export const showError = async (req: Request, res: Response, next: NextFunction, schema: any) => {
  try {
    await schema.validate(req.body)

    next()
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    }

    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}