'use client'

import { useActionState } from "react"
import SubmitButton from "../submit-button"
import Questionnaire from "./questionnaire"
import ResultDialog from "../result-dialog"

const submitChallengeInitialState = {
  message: '',
  messageTitle: '',
}

interface ISubmitChallengeForm {
  questions: IQuestion[],
  submitChallengeAction: (prevState: typeof submitChallengeInitialState, formData: FormData) => Promise<{
    message: string;
    messageTitle: string;
  }>
}

const SubmitChallengeForm = ({ questions, submitChallengeAction }: ISubmitChallengeForm) => {
  const [state, formAction] = useActionState(submitChallengeAction, submitChallengeInitialState)

  return (
    <>
      <form action={formAction}>
        <Questionnaire questions={questions} />
        <div className='flex justify-end'>
          <SubmitButton label='Enviar' loadingLabel='Enviando...' />
        </div>
      </form>
      <ResultDialog message={state.message} messageTitle={state.messageTitle} isOpen={Boolean(state.message && state.messageTitle)} />
    </>
  )
}

export default SubmitChallengeForm
