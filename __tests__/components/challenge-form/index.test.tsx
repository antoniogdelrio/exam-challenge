import { fireEvent, render, screen } from "@testing-library/react"
import ChallengeForm from "@/components/challenge-form"
import { describe, it } from "vitest"

describe("ChallengeForm", () => {
  it.only("renders the select input and all checkboxes with labels", () => {
    render(<ChallengeForm />)

    screen.getByRole("checkbox", { name: "Matemática" })
    screen.getByRole("checkbox", { name: "Ciências da Natureza" })
    screen.getByRole("checkbox", { name: "Linguagens e Códigos" })
    screen.getByRole("checkbox", { name: "Ciências Humanas" })

    screen.getByLabelText("Quantidade de Questões")
    screen.getByRole("combobox", { name: "Quantidade de Questões" })

    fireEvent.click(screen.getByRole("combobox", { name: "Quantidade de Questões" }))

    screen.getByRole("option", { name: "4" })
    screen.getByRole("option", { name: "8" })
    screen.getByRole("option", { name: "12" })
  })
})