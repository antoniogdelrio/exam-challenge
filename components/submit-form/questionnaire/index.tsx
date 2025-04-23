import Question from "../../question";

interface IQuestionnaire {
  questions: IQuestion[]
}

export default function Questionnaire({ questions }: IQuestionnaire) {
  return (
    questions.map((question, index) => (
      <Question
        key={index}
        title={question.title}
        discipline={question.discipline}
        context={question.context}
        index={question.index}
        year={question.year}
        alternativesIntroduction={question.alternativesIntroduction}
        alternatives={question.alternatives}
      />
    ))
  );
}
