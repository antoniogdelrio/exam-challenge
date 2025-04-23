'use server'

import { permanentRedirect, redirect } from "next/navigation"
import CreateChallenge from "../usecases/CreateChallenge"
import { z } from 'zod'
import VerifyCode from "../usecases/VerifyCode"
import GetChallengeByCode from "../usecases/GetChallengeByCode"
import { EnemDevExamGateway } from "../gateways/ExamGateway"
import SubmitChallenge from "../usecases/SubmitChallenge"

export const createChallenge = async (_prevState: unknown, formData: FormData) => {
  const formSchema = z.object({
    challengeSize: z.union([z.literal(4), z.literal(8), z.literal(12)]),
    selectedThemes: z.array(z.string()).min(1, "Select at least one theme")
  })

  let challengeCode = ''

  try {
    const validatedData = formSchema.parse({
      challengeSize: Number(formData.get("challengeSize")),
      selectedThemes: formData.getAll("selectedThemes")
    })

    const createChallenge = await (new CreateChallenge()).execute({
      challengeSize: validatedData.challengeSize,
      selectedThemes: validatedData.selectedThemes
    });

    challengeCode = createChallenge.code
  } catch (error) {
    console.error(error)
    return {
      message: "Erro na criação do desafio. Tente novamente.",
    }
  }
  redirect(`/link?code=${challengeCode}`)
}

export const verifyCode = async (code: string): Promise<string> => {

  const verifyCode = new VerifyCode()
  const { isValid } = await verifyCode.execute({ code })

  if (!isValid) {
    permanentRedirect('/')
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const challengeLink = `${baseUrl}/exam/${code}`

  return challengeLink
}

export const getChallengeByCode = async (code: string): Promise<IQuestion[]> => {
  let examQuestions
  try {
    const getChallengeByCode = new GetChallengeByCode(new EnemDevExamGateway())
    const getChallengeByCodeResult = await getChallengeByCode.execute({ code })
    examQuestions = getChallengeByCodeResult.questions
  } catch (error) {
    console.error(error)
    permanentRedirect('/')
  }

  return examQuestions
}

export const submitChallenge = async (_prevState: unknown, formData: FormData) => {
  const correctAnswers: string[] = []
  const submittedAnswers: string[] = []

  const entries = Array.from(formData.entries())

  entries.forEach(([key, value]) => {
    if (key.includes('-answer')) {
      const correctAnswer = value.toString()
      correctAnswers.push(correctAnswer)
    }
    if (key.includes('-question')) {
      const submittedAnswer = value.toString()
      submittedAnswers.push(submittedAnswer)
    }
  })

  const { messageTitle, message } = await (new SubmitChallenge()).execute({
    correctAnswers,
    submittedAnswers
  })

  return {
    messageTitle,
    message
  }
}