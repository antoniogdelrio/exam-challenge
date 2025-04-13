import { render, screen, fireEvent } from "@testing-library/react"
import ChallengeForm from "@/components/challenge-form"
import "@testing-library/jest-dom"
import { describe, it, expect } from "vitest"

describe("ChallengeForm", () => {
  it("renders the select input and all checkboxes with labels", () => {
    render(<ChallengeForm />)

    expect(screen.getAllByText("Quantidade de Questões")).toHaveLength(2)

    expect(screen.getByLabelText("Matemática")).toBeInTheDocument()
    expect(screen.getByLabelText("Ciências da Natureza")).toBeInTheDocument()
    expect(screen.getByLabelText("Linguagens e Códigos")).toBeInTheDocument()
    expect(screen.getByLabelText("Ciências Humanas")).toBeInTheDocument()
  })

  it("opens select options when clicked", async () => {
    render(<ChallengeForm />)

    const selectTrigger = screen.getByRole("combobox")
    fireEvent.click(selectTrigger)

    expect(screen.getByRole("listbox")).toBeInTheDocument()

    expect(screen.getByRole('option', { name: '4' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '8' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '12' })).toBeInTheDocument()
  })

  it("allows checkbox interaction", () => {
    render(<ChallengeForm />)

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

    // Test unchecking
    fireEvent.click(mathCheckbox)
    expect(mathCheckbox).not.toBeChecked()
  })
})