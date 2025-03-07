import CreateChallenge from "@/lib/usecases/CreateChallenge"
import { test, expect, beforeAll, vi, afterAll } from 'vitest'
import jwt from 'jsonwebtoken'

const secret = 'secret'

beforeAll(() => {
  vi.stubEnv('JWT_SECRET', secret)
})

afterAll(() => {
  vi.unstubAllEnvs()
})

const decodeJwt = (jwtCode: string) => {
  const decodedJwt = jwt.verify(jwtCode, secret)
  return (decodedJwt as {
    challengeSize: number,
    selectedThemes: string[],
    iat: number,
    exp: number
  })
}

test('should create a challenge code successfully', async () => {
  const createChallenge = new CreateChallenge()

  const createChallengeOutput = await createChallenge.execute({
    challengeSize: 4,
    selectedThemes: ['matematica', 'linguagens']
  })

  expect(createChallengeOutput.code).toBeDefined()

  expect(decodeJwt(createChallengeOutput.code).challengeSize).toBe(4)
  expect(decodeJwt(createChallengeOutput.code).selectedThemes).toEqual(['matematica', 'linguagens'])
  expect(decodeJwt(createChallengeOutput.code).iat).toBeDefined()
  expect(decodeJwt(createChallengeOutput.code).exp).toBeDefined()
})