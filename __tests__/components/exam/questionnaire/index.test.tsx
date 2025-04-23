import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Questionnaire from "@/components/exam/questionnaire"

const sampleQuestions: IQuestion[] = [
  {
    year: 2023,
    discipline: "math",
    index: 1,
    title: "First Question",
    context: "Math context",
    alternativesIntroduction: "Choose:",
    alternatives: [
      { letter: "A", text: "Option A", file: null, isCorrect: false },
      { letter: "B", text: "Option B", file: null, isCorrect: true }
    ]
  },
  {
    year: 2023,
    discipline: "physics",
    index: 2,
    title: "Second Question",
    context: "Physics context",
    alternativesIntroduction: "Select:",
    alternatives: [
      { letter: "A", text: "First choice", file: null, isCorrect: true },
      { letter: "B", text: "Second choice", file: null, isCorrect: false }
    ]
  }
]

describe("Questionnaire Component", () => {
  it("renders multiple questions correctly", () => {
    render(<Questionnaire questions={sampleQuestions} />)

    expect(screen.getByText("First Question")).toBeDefined()
    expect(screen.getByText("Second Question")).toBeDefined()
  })
})