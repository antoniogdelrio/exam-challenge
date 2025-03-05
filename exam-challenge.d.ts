interface IAlternative {
  letter: string,
  text: string,
  file: string | null
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