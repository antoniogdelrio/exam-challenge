'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"

const ChallengeForm = () => {
  return (
    <form>
      <div className="mb-4">
        <Label htmlFor="challengeSize" className="mb-2">
          <p className="text-base font-medium">Quantidade de Questões</p>
        </Label>
        <Select>
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
            <Checkbox id="matematica" />
            <Label htmlFor="matematica">Matemática</Label>
          </div>
          <div className="flex gap-1 items-center w-[100%] mb-4 sm:w-[50%]">
            <Checkbox id="natureza" />
            <Label htmlFor="natureza">Ciências da Natureza</Label>
          </div>
          <div className="flex gap-1 items-center w-[100%] mb-4 sm:w-[50%]">
            <Checkbox id="linguagens" />
            <Label htmlFor="linguagens">Linguagens e Códigos</Label>
          </div>
          <div className="flex gap-1 items-center w-[100%] mb-4 sm:w-[50%]">
            <Checkbox id="humanas" />
            <Label htmlFor="humanas">Ciências Humanas</Label>
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default ChallengeForm