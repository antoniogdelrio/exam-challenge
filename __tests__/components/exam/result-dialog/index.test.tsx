import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ResultDialog from "@/components/exam/result-dialog"
import { redirect } from "next/navigation"

vi.mock("next/navigation", () => ({
  redirect: vi.fn()
}))

const mockProps = {
  messageTitle: "Test Title",
  message: "Test Message",
  shareableMessage: "Test Shareable Message",
  isOpen: true
}

describe("ResultDialog Component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it("renders dialog with correct content when open", () => {
    render(<ResultDialog {...mockProps} />)

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("heading")).toHaveTextContent(mockProps.messageTitle)
    expect(screen.getByText(mockProps.message)).toBeInTheDocument()
  })

  it("renders share button with correct text and icon", () => {
    render(<ResultDialog {...mockProps} />)

    const shareButton = screen.getByRole("button", { name: /compartilhe/i })
    expect(shareButton).toBeInTheDocument()
    expect(shareButton).toHaveTextContent("Compartilhe")
  })

  it("calls navigator.share with correct data when share button is clicked", async () => {
    const mockShare = vi.fn()
    vi.stubGlobal("navigator", {
      share: mockShare
    })

    render(<ResultDialog {...mockProps} />)

    const shareButton = screen.getByRole("button", { name: /compartilhe/i })
    await userEvent.click(shareButton)

    expect(mockShare).toHaveBeenCalledWith({
      title: "Hey! Respondi um desafio da Exam Challenge.",
      text: mockProps.shareableMessage,
      url: "https://exam-challenge-url.vercel.app/"
    })
  })

  it("redirects to home when dialog is closed", async () => {
    render(<ResultDialog {...mockProps} />)

    const closeButton = screen.getByRole('button', {
      name: 'Fechar'
    })

    await userEvent.click(closeButton)

    expect(redirect).toHaveBeenCalledWith("/")
  })
})