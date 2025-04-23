import { render, screen, fireEvent } from "@testing-library/react"
import ChallengeForm from "@/components/home/challenge-form"
import "@testing-library/jest-dom"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"

describe("ChallengeForm", () => {
  it("renders the select input and all checkboxes with labels", () => {
    render(<ChallengeForm createChallengeAction={vi.fn()} />)

    expect(screen.getAllByText("Quantidade de Questões")).toHaveLength(2)

    expect(screen.getByLabelText("Matemática")).toBeInTheDocument()
    expect(screen.getByLabelText("Ciências da Natureza")).toBeInTheDocument()
    expect(screen.getByLabelText("Linguagens e Códigos")).toBeInTheDocument()
    expect(screen.getByLabelText("Ciências Humanas")).toBeInTheDocument()
  })

  it("opens select options when clicked", async () => {
    render(<ChallengeForm createChallengeAction={vi.fn()} />)

    const selectTrigger = screen.getByRole("combobox")
    fireEvent.click(selectTrigger)

    expect(screen.getByRole("listbox")).toBeInTheDocument()

    expect(screen.getByRole('option', { name: '4' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '8' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '12' })).toBeInTheDocument()
  })

  it("allows checkbox interaction", () => {
    render(<ChallengeForm createChallengeAction={vi.fn()} />)

    const mathCheckbox = screen.getByLabelText("Matemática")
    const scienceCheckbox = screen.getByLabelText("Ciências da Natureza")
    const languageCheckbox = screen.getByLabelText("Linguagens e Códigos")
    const humanitiesCheckbox = screen.getByLabelText("Ciências Humanas")

    fireEvent.click(mathCheckbox)
    fireEvent.click(scienceCheckbox)

    expect(mathCheckbox).toBeChecked()
    expect(scienceCheckbox).toBeChecked()
    expect(languageCheckbox).not.toBeChecked()
    expect(humanitiesCheckbox).not.toBeChecked()

    fireEvent.click(mathCheckbox)
    expect(mathCheckbox).not.toBeChecked()
  })

  it("should call the createChallengeAction function on form submission", async () => {
    const mockCreateChallengeAction = vi.fn()
    render(<ChallengeForm createChallengeAction={mockCreateChallengeAction} />)

    const selectTrigger = screen.getByRole("combobox")
    fireEvent.click(selectTrigger)

    const option4 = screen.getByRole('option', { name: '4' })
    fireEvent.click(option4)

    const mathCheckbox = screen.getByLabelText("Matemática")

    fireEvent.click(mathCheckbox)

    const submitButton = screen.getByRole("button", { name: 'Criar' })

    await userEvent.click(submitButton)

    expect(mockCreateChallengeAction).toHaveBeenCalled()
    expect(mockCreateChallengeAction.mock.calls[0][1]).toBeInstanceOf(FormData)

    expect((mockCreateChallengeAction.mock.calls[0][1] as FormData).get("challengeSize")).toEqual("4")
    expect((mockCreateChallengeAction.mock.calls[0][1] as FormData).get("selectedThemes")).toEqual("matematica")
  })
})