import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'

import { User } from '@models/User'

interface IRegister {
  firstName: string
  lastName: string
  age: number
  email: string
  password: string
}

export default class RegisterService {
  async execute({ firstName, lastName, age, email, password }: IRegister) {
    const userRepository = getRepository(User)

    try {
      const userExists = await userRepository.findOne({ email })

      if (userExists) {
        throw new Error('The email already registered')
      }

      const salt = await bcrypt.genSalt(12)
      const hash = await bcrypt.hash(password, salt)

      const newUser = userRepository.create({ firstName, lastName, age, email, passwordHash: hash })

      const user = await userRepository.save(newUser)

      return user
    } catch (err) {
      throw new Error(err.message)
    }
  }
}