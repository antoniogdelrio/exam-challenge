import { FakeExamGateway } from "@/lib/gateways/ExamGateway";
import CreateChallenge from "@/lib/usecases/CreateChallenge";
import GetChallengeByCode from "@/lib/usecases/GetChallengeByCode";
import { afterAll, beforeAll, expect, test, vi } from "vitest";

beforeAll(() => {
  vi.stubEnv('JWT_SECRET', 'secret')
})

afterAll(() => {
  vi.unstubAllEnvs()
})

test('should return a challenge by code', async () => {
  const createChallenge = new CreateChallenge();
  const createChallengeOutput = await createChallenge.execute({
    challengeSize: 4,
    selectedThemes: ['matematica', 'linguagens']
  })

  const getChallengeByCode = new GetChallengeByCode(new FakeExamGateway());

  const challenge = await getChallengeByCode.execute({
    code: createChallengeOutput.code
  });

  expect(challenge.questions).toHaveLength(4);

  challenge.questions.forEach((question) => {
    expect(question.title).toBeDefined();
    expect(question.discipline).toBeDefined();
    expect(question.context).toBeDefined();
    expect(question.index).toBeDefined();
    expect(question.year).toBeDefined();
    expect(question.alternativesIntroduction).toBeDefined();
    expect(question.alternatives).toHaveLength(5);
    question.alternatives.forEach((alternative) => {
      expect(alternative.letter).toBeDefined();
      expect(alternative.text).toBeDefined();
      expect(alternative.isCorrect).toBeDefined();
    })
  })

  //check if all the questions combinations of title and year are differents
  expect(challenge.questions.map((question) => `${question.title}${question.year}`).length).toEqual(new Set(challenge.questions.map((question) => `${question.title}${question.year}`)).size);
});

test('should return an error if code is invalid', async () => {
  const getChallengeByCode = new GetChallengeByCode(new FakeExamGateway());

  const input = {
    code: 'invalid-code'
  }

  await expect(() => getChallengeByCode.execute(input)).rejects.toThrow(new Error("Invalid challenge code"));
})