import { FakeExamGateway } from "@/lib/gateways/ExamGateway";
import CreateChallenge from "@/lib/usecases/CreateChallenge";
import GetChallengeByCode from "@/lib/usecases/GetChallengeByCode";
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
    const createChallenge = new CreateChallenge()

    const createChallengeOutput = await createChallenge.execute({
      challengeSize: 4,
      selectedThemes: ['matematica', 'linguagens']
    })

    const getChallengeByCode = new GetChallengeByCode(new FakeExamGateway());

    const challenge = await getChallengeByCode.execute({
      code: createChallengeOutput.code
    });

    const submitChallenge = new SubmitChallenge()

    const submitChallengeOutput = await submitChallenge.execute({
      challenge: challenge.questions,
      answers: ["A", "A", "C", "D"],
    })

    expect(submitChallengeOutput.numberOfCorrectAnswers).toBe(2);
    expect(submitChallengeOutput.numberOfQuestions).toBe(4);
    expect(submitChallengeOutput.message).toBe('Você acertou 2 de 4 questões.')
  })

  it("should submit a challenge and return the result with a specific message when all the questions are correct", async () => {
    const createChallenge = new CreateChallenge()

    const createChallengeOutput = await createChallenge.execute({
      challengeSize: 4,
      selectedThemes: ['matematica', 'linguagens']
    })

    const getChallengeByCode = new GetChallengeByCode(new FakeExamGateway());

    const challenge = await getChallengeByCode.execute({
      code: createChallengeOutput.code
    });

    const submitChallenge = new SubmitChallenge()

    const submitChallengeOutput = await submitChallenge.execute({
      challenge: challenge.questions,
      answers: ["A", "A", "A", "A"],
    })

    expect(submitChallengeOutput.numberOfCorrectAnswers).toBe(4);
    expect(submitChallengeOutput.numberOfQuestions).toBe(4);
    expect(submitChallengeOutput.message).toBe("Parabéns! Você acertou todas as questões.")
  })
});