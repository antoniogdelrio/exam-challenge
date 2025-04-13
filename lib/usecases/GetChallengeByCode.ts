import jwt from 'jsonwebtoken';
import { ExamGateway } from '../gateways/ExamGateway';

export default class GetChallengeByCode {
  private examGateway: ExamGateway;

  constructor(examGateway: ExamGateway) {
    this.examGateway = examGateway;
  }

  async execute({ code }: Input): Promise<Output> {
    const secret = process.env.JWT_SECRET as string;

    let decodedJwt;
    try {
      decodedJwt = jwt.verify(code, secret) as {
        challengeSize: number;
        selectedThemes: string[];
      };
    } catch (error) {
      console.error(error)
      throw new Error('Invalid challenge code');
    }

    const questions = await this.examGateway.getChallenge({
      challengeSize: decodedJwt.challengeSize,
      selectedThemes: decodedJwt.selectedThemes
    });

    return {
      questions
    };
  }
}

type Input = {
  code: string;
}

type Output = {
  questions: IQuestion[];
}