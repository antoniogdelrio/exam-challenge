export default class SubmitChallenge {
  async execute({ correctAnswers, submittedAnswers }: Input): Promise<Output> {
    const numberOfCorrectAnswers = correctAnswers.reduce((acc, correctAnswer, index) => {
      if (correctAnswer === submittedAnswers[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const numberOfQuestions = correctAnswers.length;

    const isAllAnswersCorrect = numberOfCorrectAnswers === numberOfQuestions;

    const messageTitle = isAllAnswersCorrect ? "Parabéns!" : "Resultado";

    const message = isAllAnswersCorrect ? "Parabéns! Você acertou todas as questões." : `Você acertou ${numberOfCorrectAnswers} de ${numberOfQuestions} questões.`;

    return {
      messageTitle,
      message,
    };
  }
}

type Input = {
  correctAnswers: string[],
  submittedAnswers: string[];
}

type Output = {
  message: string;
  messageTitle: string;
}
