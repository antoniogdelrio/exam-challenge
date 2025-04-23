import Questionnaire from '@/components/questionnaire'
import { Button } from '@/components/ui/button'
import { getChallengeByCode } from '@/lib/actions'

interface PageProps {
  params: {
    code: string[]
  }
}

export default async function Exam({ params }: PageProps) {
  const [challengeCode] = params.code

  const examQuestions = await getChallengeByCode(challengeCode)

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
