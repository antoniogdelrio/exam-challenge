'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "../../ui/label"
import { Checkbox } from "../../ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card"
import { useActionState } from "react"
import SubmitButton from "../../ui/submit-button"

const createChallengeInitialState = {
  message: '',
}

interface IChallengeForm {
  createChallengeAction: (prevState: typeof createChallengeInitialState, formData: FormData) => Promise<{
    message: string;
  }>
}

const ChallengeForm = ({ createChallengeAction }: IChallengeForm) => {
  const [state, formAction] = useActionState(createChallengeAction, createChallengeInitialState)

  return (
    <form action={formAction}>
      <Card className="w-full">
        <CardHeader>
          Selecione o número de questões e as disciplinas.
        </CardHeader>
        <CardContent>
          <div>
            <div className="mb-4">
              <Label htmlFor="challengeSize" className="mb-2">
                <p className="text-base font-medium">Quantidade de Questões</p>
              </Label>
              <Select name="challengeSize">
                <SelectTrigger className="w-[100%]" id="challengeSize">
                  <SelectValue placeholder="Quantidade de Questões" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <fieldset>
              <legend className="mb-2">
                <p className="text-base font-medium">Cadernos</p>
              </legend>
              <div className="flex flex-wrap">
                <div className="flex gap-1 items-center w-[100%] mb-4 sm:w-[50%]">
                  <Checkbox name="selectedThemes" id="matematica" value="matematica" />
                  <Label htmlFor="matematica">Matemática</Label>
                </div>
                <div className="flex gap-1 items-center w-[100%] mb-4 sm:w-[50%]">
                  <Checkbox name="selectedThemes" id="ciencias-natureza" value="ciencias-natureza" />
                  <Label htmlFor="ciencias-natureza">Ciências da Natureza</Label>
                </div>
                <div className="flex gap-1 items-center w-[100%] mb-4 sm:w-[50%]">
                  <Checkbox name="selectedThemes" id="linguagens" value="linguagens" />
                  <Label htmlFor="linguagens">Linguagens e Códigos</Label>
                </div>
                <div className="flex gap-1 items-center w-[100%] mb-4 sm:w-[50%]">
                  <Checkbox name="selectedThemes" id="ciencias-humanas" value="ciencias-humanas" />
                  <Label htmlFor="ciencias-humanas">Ciências Humanas</Label>
                </div>
              </div>
            </fieldset>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {state?.message && <p className="text-red-900">{state?.message}</p>}
          <div className="ml-au">
            <SubmitButton label="Criar" loadingLabel="Criando..." />
          </div>
        </CardFooter>
      </Card>
    </form>

  )
}

export default ChallengeForm