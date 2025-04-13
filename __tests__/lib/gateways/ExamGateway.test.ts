import { EnemDevExamGateway } from "@/lib/gateways/ExamGateway";
import { test, expect, vi, beforeEach, describe, afterEach } from 'vitest';
import type { MockInstance } from 'vitest';


const createMockQuestion = () => {
  const getRandomDiscipline = () => {
    const disciplines = ['matematica', 'linguagens', 'ciencias-natureza', 'ciencias-humanas'];
    return disciplines[Math.floor(Math.random() * disciplines.length)];
  }

  const getRandomQuestionIndex = () => {
    return Math.floor(Math.random() * 180) + 1;
  }

  const questionIndex = getRandomQuestionIndex()

  console.log("questionIndex", questionIndex)

  return ({
    title: `Questão ${questionIndex} - ENEM 2020`,
    index: questionIndex,
    discipline: getRandomDiscipline(),
    language: null,
    year: 2020,
    context: "Test context",
    correctAlternative: "B",
    alternativesIntroduction: "Test introduction",
    alternatives: [
      { letter: "A", text: "Option A", file: null },
      { letter: "B", text: "Option B", file: null },
      { letter: "C", text: "Option C", file: null },
      { letter: "D", text: "Option D", file: null },
      { letter: "E", text: "Option E", file: null }
    ]
  });
}

describe('EnemDevExamGateway', () => {
  let gateway: EnemDevExamGateway;
  let fetchMock: MockInstance;

  beforeEach(() => {
    gateway = new EnemDevExamGateway();
    fetchMock = vi.spyOn(global, 'fetch') as MockInstance;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test('should fetch questions with balanced distribution', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(createMockQuestion())
      })
    );

    const themes = ['matematica', 'linguagens'];

    const result = await gateway.getChallenge({
      challengeSize: 4,
      selectedThemes: themes
    });

    expect(result).toHaveLength(4);

    const themeCounts = themes.reduce((acc, theme) => {
      acc[theme] = result.filter(q => q.discipline === theme).length;
      return acc;
    }, {} as Record<string, number>);


    expect(themeCounts['matematica']).toBe(2);
    expect(themeCounts['linguagens']).toBe(2);
  });

  test('should handle rate limiting', async () => {
    let callCount = 0;
    fetchMock.mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve({
          ok: false,
          status: 429,
          statusText: 'Too Many Requests'
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(createMockQuestion())
      });
    });

    const promise = gateway.getChallenge({
      challengeSize: 1,
      selectedThemes: ['matematica']
    });

    await vi.advanceTimersByTimeAsync(1000);
    const result = await promise;

    expect(result).toHaveLength(1);
  });

  test('should avoid duplicate questions', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(createMockQuestion())
      })
    );

    const result = await gateway.getChallenge({
      challengeSize: 2,
      selectedThemes: ['matematica']
    });

    expect(result).toHaveLength(2);
    expect(result[0].title).not.toBe(result[1].title);
  });
});