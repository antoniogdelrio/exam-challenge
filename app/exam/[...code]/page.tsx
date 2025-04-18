import Questionnaire from '@/components/questionnaire'
import { Button } from '@/components/ui/button'
import { EnemDevExamGateway } from '@/lib/gateways/ExamGateway'
import GetChallengeByCode from '@/lib/usecases/GetChallengeByCode'
import { Loader2 } from 'lucide-react'
import { permanentRedirect } from 'next/navigation'
import { Suspense } from 'react'

interface PageProps {
  params: {
    code: string[]
  }
}

interface ISuspensableExamContentProps {
  challengeCode: string
}

const SuspensableExamContent = async ({ challengeCode }: ISuspensableExamContentProps) => {
  let examQuestions
  try {
    const getChallengeByCode = new GetChallengeByCode(new EnemDevExamGateway())
    const getChallengeByCodeResult = await getChallengeByCode.execute({ code: challengeCode })
    examQuestions = getChallengeByCodeResult.questions
  } catch (err) {
    permanentRedirect('/')
  }

  return (
    <>
      <Questionnaire questions={examQuestions} />
      <div className='flex justify-end'>
        <Button className='mb-4'>
          Finalizar
        </Button>
      </div>
    </>
  )
}

export default async function Exam({ params }: PageProps) {
  const [challengeCode] = params.code

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <SuspensableExamContent challengeCode={challengeCode} />
    </Suspense>
  )
}