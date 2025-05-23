import { delay } from "../utils";

export interface ExamGateway {
  getChallenge(params: ChallengeRequest): Promise<IQuestion[]>;
}

type DisciplineRange = {
  start: number;
  end: number;
}

export class EnemDevExamGateway implements ExamGateway {
  private readonly BASE_URL = "https://api.enem.dev/v1";
  private readonly DISCIPLINE_RANGES: Record<string, DisciplineRange> = {
    'linguagens': { start: 1, end: 45 },
    'ciencias-humanas': { start: 46, end: 90 },
    'ciencias-natureza': { start: 91, end: 135 },
    'matematica': { start: 136, end: 180 }
  };
  private readonly START_YEAR = 2017;

  private async fetchQuestion(year: number, index: number): Promise<IQuestion> {
    await delay(1000);

    const response = await fetch(`${this.BASE_URL}/exams/${year}/questions/${index}`);

    if (!response.ok) {
      if (response.status === 429) {
        return this.fetchQuestion(year, index);
      }
      throw new Error(`Failed to fetch question: ${response.statusText}`);
    }

    const data = await response.json() as IQuestion;

    return data;
  }

  private getRandomQuestionIndex(discipline: string): number {
    const range = this.DISCIPLINE_RANGES[discipline];
    if (!range) {
      throw new Error(`Invalid discipline: ${discipline}`);
    }
    return Math.floor(Math.random() * (range.end - range.start + 1)) + range.start;
  }

  private getRandomYear(): number {
    const currentYear = new Date().getFullYear();
    return Math.floor(Math.random() * (currentYear - this.START_YEAR + 1)) + this.START_YEAR;
  }

  async getChallenge({ challengeSize, selectedThemes }: ChallengeRequest): Promise<IQuestion[]> {
    const questions: IQuestion[] = [];
    const questionsPerTheme = Math.ceil(challengeSize / selectedThemes.length);

    for (const theme of selectedThemes) {
      const themeQuestions = [];

      for (let i = 0; i < questionsPerTheme && questions.length < challengeSize;) {
        const year = this.getRandomYear();
        const index = this.getRandomQuestionIndex(theme);

        try {
          const question = await this.fetchQuestion(year, index);
          if (questions.some(q => q.title === question.title && q.year === question.year)) {
            throw new Error('Duplicate question found');
          }
          if (question.discipline !== theme) {
            throw new Error('Question discipline does not match theme');
          }
          themeQuestions.push(question);
          i++;
        } catch (error) {
          console.error(error);
          continue;
        }
      }

      questions.push(...themeQuestions);
    }

    return questions.slice(0, challengeSize);
  }
}

export class FakeExamGateway implements ExamGateway {
  async getChallenge({ challengeSize, selectedThemes }: ChallengeRequest) {
    return Array.from({ length: challengeSize }, (_, index) => ({
      title: `Question ${index + 1}`,
      discipline: selectedThemes[index % selectedThemes.length],
      context: `Context for question ${index + 1}`,
      index: index + 1,
      year: new Date().getFullYear(),
      alternativesIntroduction: `Introduction for question ${index + 1}`,
      alternatives: Array.from({ length: 5 }, (_, altIndex) => ({
        letter: String.fromCharCode(65 + altIndex),
        text: `Alternative ${altIndex + 1}`,
        isCorrect: altIndex === 0,
        file: null
      }))
    }));
  }
}