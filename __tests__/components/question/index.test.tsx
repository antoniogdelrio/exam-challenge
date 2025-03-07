import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Question from "@/components/question"
import userEvent from "@testing-library/user-event"

const sampleQuestion = {
  year: 2023,
  discipline: "math",
  index: 1,
  title: "Sample Question Title",
  context: "This is a **Markdown** content with an image: ![Alt text](/test-image.jpg)",
  alternativesIntroduction: "Choose the correct option:",
  alternatives: [
    { letter: "A", text: "Alternative **A**" },
    { letter: "B", text: "Alternative **B**" }
  ]
} as IQuestion

describe("Question Component", () => {
  it("renders title correctly", () => {
    render(<Question {...sampleQuestion} />)
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(sampleQuestion.title)
  })

  it("renders context markdown content", () => {
    render(<Question {...sampleQuestion} />)
    expect(screen.getByText("Markdown", { exact: false })).toBeDefined()
    const image = screen.getByAltText("Alt text")
    expect(image).toBeDefined()
  })

  it("renders alternatives introduction", () => {
    render(<Question {...sampleQuestion} />)
    expect(screen.getByText(sampleQuestion.alternativesIntroduction)).toBeDefined()
  })

  it("renders radio group with alternatives", async () => {
    render(<Question {...sampleQuestion} />)
    sampleQuestion.alternatives.forEach((alternative) => {
      expect(screen.getByRole('radio', { name: `(${alternative.letter}) Alternative ${alternative.letter}` })).toBeDefined()
    })

    const radioOptions = screen.getAllByRole("radio")
    expect(radioOptions.length).toBe(sampleQuestion.alternatives.length)
    await userEvent.click(radioOptions[0])
    expect((radioOptions[0] as HTMLInputElement)).toBeChecked()
  })
})