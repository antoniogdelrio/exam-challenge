import { render, screen, fireEvent } from "@testing-library/react"
import ChallengeForm from "@/components/challenge-form"
import "@testing-library/jest-dom"
import { describe, it, expect } from "vitest"



describe("ChallengeForm", () => {
  it.only("renders the select input and all checkboxes with labels", () => {
    render(<ChallengeForm />)

    expect(screen.getAllByText("Quantidade de Questões")).toHaveLength(2)

    expect(screen.getByLabelText("Matemática")).toBeInTheDocument()
    expect(screen.getByLabelText("Ciências da Natureza")).toBeInTheDocument()
    expect(screen.getByLabelText("Linguagens e Códigos")).toBeInTheDocument()
    expect(screen.getByLabelText("Ciências Humanas")).toBeInTheDocument()
  })

  it("opens select options when clicked", async () => {
    render(<ChallengeForm />)

    // Find the select trigger which has the placeholder text
    const selectTrigger = screen.getByRole("button", {
      name: /Quantidade de Questões/i,
    })
    fireEvent.click(selectTrigger)

    // Check that the select options are rendered
    expect(await screen.findByText("4")).toBeInTheDocument()
    expect(await screen.findByText("8")).toBeInTheDocument()
    expect(await screen.findByText("12")).toBeInTheDocument()
  })

  it("allows checkbox interaction", () => {
    render(<ChallengeForm />)

    const checkboxMatematica = screen.getByLabelText("Matemática") as HTMLInputElement

    // Click to check the checkbox
    fireEvent.click(checkboxMatematica)
    expect(checkboxMatematica.checked).toBeTruthy()

    // Click again to uncheck
    fireEvent.click(checkboxMatematica)
    expect(checkboxMatematica.checked).toBeFalsy()
  })
})