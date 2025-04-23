import SubmitChallengeForm from '@/components/exam/submit-form'
import { getChallengeByCode, submitChallenge } from '@/lib/actions'

type Params = Promise<{ code: string }>

export default async function Exam(props: { params: Params }) {
  const pathParams = await props.params

  const [challengeCode] = pathParams.code

  const examQuestions = await getChallengeByCode(challengeCode)

  return (
    <SubmitChallengeForm questions={examQuestions} submitChallengeAction={submitChallenge} />
  )
}
