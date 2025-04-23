import { render, screen } from "@testing-library/react"
import SubmitChallengeForm from "@/components/exam/submit-form"
import "@testing-library/jest-dom"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"

const sampleQuestions: IQuestion[] = [
  {
    year: 2023,
    discipline: "math",
    index: 1,
    title: "First Question",
    context: "Math context",
    alternativesIntroduction: "Choose:",
    alternatives: [
      { letter: "A", text: "Option A", file: null, isCorrect: true },
      { letter: "B", text: "Option B", file: null, isCorrect: false }
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
      { letter: "A", text: "First choice", file: null, isCorrect: false },
      { letter: "B", text: "Second choice", file: null, isCorrect: true }
    ]
  }
]

describe("SubmitChallengeForm", () => {
  it("renders the form with questions and submit button", () => {
    render(<SubmitChallengeForm
      questions={sampleQuestions}
      submitChallengeAction={vi.fn()}
    />)

    expect(screen.getByText("First Question")).toBeInTheDocument()
    expect(screen.getByText("Second Question")).toBeInTheDocument()

    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument()
  })

  it("shows loading state when submitting", async () => {
    const mockSubmit = vi.fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return {
        message: "",
        messageTitle: "",
        shareableMessage: "",
        error: ""
      }
    })

    render(<SubmitChallengeForm
      questions={sampleQuestions}
      submitChallengeAction={mockSubmit}
    />)

    const submitButton = screen.getByRole("button", { name: "Enviar" })
    await userEvent.click(submitButton)

    expect(screen.getByRole("button", { name: "Enviando..." })).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("submits form with selected answers", async () => {
    const mockCreateChallengeAction = vi.fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return {
        message: "",
        messageTitle: "",
        shareableMessage: "",
        error: ""
      }
    })

    render(<SubmitChallengeForm
      questions={sampleQuestions}
      submitChallengeAction={mockCreateChallengeAction}
    />)

    const firstQuestionOptions = screen.getAllByRole("radio", { name: /Option/ })
    const secondQuestionOptions = screen.getAllByRole("radio", { name: /choice/ })

    await userEvent.click(firstQuestionOptions[0])
    await userEvent.click(secondQuestionOptions[1])

    const submitButton = screen.getByRole("button", { name: "Enviar" })
    await userEvent.click(submitButton)

    expect(mockCreateChallengeAction).toHaveBeenCalled()
    const formData = (mockCreateChallengeAction.mock.calls[0] as unknown as [unknown, FormData])[1] as FormData
    const entries = Array.from(formData.entries());

    expect(entries[0][0]).toBe("2023-math-1-question")
    expect(entries[0][1]).toBe("A")
    expect(entries[1][0]).toBe("2023-math-1-answer")
    expect(entries[1][1]).toBe("A")
    expect(entries[2][0]).toBe("2023-physics-2-question")
    expect(entries[2][1]).toBe("B")
    expect(entries[3][0]).toBe("2023-physics-2-answer")
    expect(entries[3][1]).toBe("B")
  })

  it("shows result dialog when submission is successful", async () => {
    const mockSubmit = vi.fn().mockResolvedValue({
      message: "Parabéns! Você acertou todas as questões.",
      messageTitle: "Parabéns!",
      shareableMessage: "Eu acertei 2 de 2 questões no desafio da Exam Challenge!",
      error: ""
    })

    render(<SubmitChallengeForm
      questions={sampleQuestions}
      submitChallengeAction={mockSubmit}
    />)

    const firstQuestionOptions = screen.getAllByRole("radio", { name: /Option/ })
    const secondQuestionOptions = screen.getAllByRole("radio", { name: /choice/ })

    await userEvent.click(firstQuestionOptions[0])
    await userEvent.click(secondQuestionOptions[1])

    const submitButton = screen.getByRole("button", { name: "Enviar" })
    await userEvent.click(submitButton)

    expect(screen.getByText("Parabéns!")).toBeInTheDocument()
    expect(screen.getByText("Parabéns! Você acertou todas as questões.")).toBeInTheDocument()
  })
})