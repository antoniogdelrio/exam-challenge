import CreateChallenge from "@/lib/usecases/CreateChallenge"
import VerifyCode from "@/lib/usecases/VerifyCode"
import { afterAll, beforeAll, expect, test, vi } from "vitest"

beforeAll(() => {
  vi.stubEnv('JWT_SECRET', 'secret')
})

afterAll(() => {
  vi.unstubAllEnvs()
})

test('should validate a challenge code successfully', async () => {
  const verifyCode = new VerifyCode()
  const createChallenge = new CreateChallenge()

  const createChallengeOutput = await createChallenge.execute({
    challengeSize: 4,
    selectedThemes: ['matematica', 'linguagens']
  })

  const verifyCodeOutput = await verifyCode.execute({
    code: createChallengeOutput.code
  })

  expect(verifyCodeOutput.isValid).toBe(true)
})

test('should not validate a challenge code successfully', async () => {
  const verifyCode = new VerifyCode()

  const verifyCodeOutput = await verifyCode.execute({
    code: 'invalid-code'
  })

  expect(verifyCodeOutput.isValid).toBe(false)
})