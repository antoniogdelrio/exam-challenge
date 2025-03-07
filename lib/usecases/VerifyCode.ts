import jwt from 'jsonwebtoken'

export default class VerifyCode {
  constructor() { }

  async execute({ code }: Input): Promise<Output> {
    try {
      const secret = process.env.JWT_SECRET as string

      const decodedJwt = jwt.verify(code, secret)

      return { isValid: !!decodedJwt }
    } catch (error) {
      console.error(error)
      return { isValid: false }
    }
  }
}

type Input = {
  code: string
}

type Output = {
  isValid: boolean
}