'use client'

import { useActionState } from "react"
import Questionnaire from "../questionnaire"
import ResultDialog from "../result-dialog"
import SubmitButton from "@/components/ui/submit-button"

const submitChallengeInitialState = {
  message: '',
  messageTitle: '',
  shareableMessage: '',
  error: ''
}

interface ISubmitChallengeForm {
  questions: IQuestion[],
  submitChallengeAction: (prevState: typeof submitChallengeInitialState, formData: FormData) => Promise<typeof submitChallengeInitialState>
}

const SubmitChallengeForm = ({ questions, submitChallengeAction }: ISubmitChallengeForm) => {
  const [state, formAction] = useActionState(submitChallengeAction, submitChallengeInitialState)

  return (
    <>
      <form action={formAction}>
        <Questionnaire questions={questions} />
        <div className='flex justify-between items-center'>
          {state.error && <p className='text-red-500'>{state.error}</p>}
          <div className="ml-auto">
            <SubmitButton label='Enviar' loadingLabel='Enviando...' />
          </div>
        </div>
      </form>
      <ResultDialog
        message={state.message}
        messageTitle={state.messageTitle}
        shareableMessage={state.shareableMessage}
        isOpen={Boolean(state.message && state.messageTitle && !state.error)}
      />
    </>
  )
}

export default SubmitChallengeForm
