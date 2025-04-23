import SubmitChallengeForm from '@/components/exam/submit-form'
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
    <SubmitChallengeForm questions={examQuestions} submitChallengeAction={submitChallenge} />
  )
}
