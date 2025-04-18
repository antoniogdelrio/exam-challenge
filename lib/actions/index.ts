'use server'

import { redirect } from "next/navigation"
import CreateChallenge from "../usecases/CreateChallenge"
import { z } from 'zod'

const formSchema = z.object({
  challengeSize: z.union([z.literal(4), z.literal(8), z.literal(12)]),
  selectedThemes: z.array(z.string()).min(1, "Select at least one theme")
})

export const formSubmitAction = async (formData: FormData) => {
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
  }
  redirect(`/link?code=${challengeCode}`)
}