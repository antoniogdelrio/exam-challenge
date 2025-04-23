import SubmitChallenge from "@/lib/usecases/SubmitChallenge";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

const secret = 'secret'

beforeAll(() => {
  vi.stubEnv('JWT_SECRET', secret)
})

afterAll(() => {
  vi.unstubAllEnvs()
})

describe("SubmitChallenge", () => {
  it("should submit a challenge and return the result", async () => {
    const submitChallenge = new SubmitChallenge()

    const submitChallengeOutput = await submitChallenge.execute({
      correctAnswers: ["A", "A", "A", "A"],
      submittedAnswers: ["A", "A", "C", "D"],
    })

    expect(submitChallengeOutput.messageTitle).toBe('Resultado')
    expect(submitChallengeOutput.message).toBe('Você acertou 2 de 4 questões.')
    expect(submitChallengeOutput.shareableMessage).toBe('Eu acertei 2 de 4 questões no desafio da Exam Challenge!')
  })

  it("should submit a challenge and return the result with a specific message when all the questions are correct", async () => {
    const submitChallenge = new SubmitChallenge()

    const submitChallengeOutput = await submitChallenge.execute({
      correctAnswers: ["A", "A", "A", "A"],
      submittedAnswers: ["A", "A", "A", "A"],
    })

    expect(submitChallengeOutput.messageTitle).toBe('Parabéns!')
    expect(submitChallengeOutput.message).toBe('Parabéns! Você acertou todas as questões.')
    expect(submitChallengeOutput.shareableMessage).toBe('Eu acertei 4 de 4 questões no desafio da Exam Challenge!')
  })
});