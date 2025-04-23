import SubmitChallenge from '@/components/submit-form'
import { getChallengeByCode, submitChallenge } from '@/lib/actions'

interface PageProps {
  params: {
    code: string[]
  }
}

export default async function Exam({ params }: PageProps) {
  const [challengeCode] = params.code

  const examQuestions = await getChallengeByCode(challengeCode)

  return (
    <SubmitChallenge questions={examQuestions} submitChallengeAction={submitChallenge} />
  )
}
