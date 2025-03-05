import jwt from 'jsonwebtoken';

export default class CreateChallenge {
  constructor() { }

  async execute({ challengeSize, selectedThemes }: Input): Promise<Output> {
    const payload = {
      challengeSize,
      selectedThemes
    };
    const code = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '30m' });
    return {
      code
    }
  }
}

type Input = {
  challengeSize: number,
  selectedThemes: string[]
}

type Output = {
  code: string
}