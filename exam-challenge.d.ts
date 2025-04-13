interface ChallengeRequest {
  challengeSize: number,
  selectedThemes: string[]
}

interface IAlternative {
  letter: string,
  text: string,
  file: string | null,
  isCorrect: boolean
}

interface IQuestion {
  title: string,
  discipline: string,
  context: string,
  year: number,
  index: number,
  alternativesIntroduction: string,
  alternatives: IAlternative[]
}