import CreateChallenge from "@/lib/usecases/CreateChallenge"

export async function POST(request: Request) {
  const { challengeSize, selectedThemes } = await request.json()
  const createChallenge = new CreateChallenge()
  const createChallengeOutput = await createChallenge.execute({
    challengeSize,
    selectedThemes
  })
  return Response.json(createChallengeOutput)
}