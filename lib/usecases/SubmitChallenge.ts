export default class SubmitChallenge {
  async execute({ challenge, answers }: Input): Promise<Output> {
    const numberOfCorrectAnswers = challenge.reduce((acc, question, index) => {
      if (question.alternatives.find(alternative => alternative.isCorrect)?.letter === answers[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const numberOfQuestions = challenge.length;

    const isAllAnswersCorrect = numberOfCorrectAnswers === numberOfQuestions;

    const message = isAllAnswersCorrect ? "Parabéns! Você acertou todas as questões." : `Você acertou ${numberOfCorrectAnswers} de ${numberOfQuestions} questões.`;

    return {
      numberOfCorrectAnswers,
      numberOfQuestions,
      message,
    };
  }
}

type Input = {
  challenge: IQuestion[],
  answers: string[];
}

type Output = {
  numberOfCorrectAnswers: number;
  numberOfQuestions: number;
  message: string;
}
