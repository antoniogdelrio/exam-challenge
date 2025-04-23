import Image from "next/image"
import Markdown from "react-markdown"
import { Label } from "../../ui/label"
import { Card, CardContent } from "../../ui/card"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"

export default function Question({ year, discipline, index, title, context, alternativesIntroduction, alternatives }: IQuestion) {
  const id = `${year}-${discipline}-${index}`

  return (<div className="mb-12">
    <Card>
      <CardContent>
        <h2 className='text-2xl text-center font-medium mb-4'>{title}</h2>
        <div className='mb-4'>
          <Markdown
            components={{
              img(props) {
                const { alt, src } = props
                return <Image
                  src={src as string}
                  width={500}
                  height={500}
                  alt={alt as string}
                />
              }
            }}
          >
            {context}
          </Markdown >
        </div>
        <p className='mb-4'>{alternativesIntroduction}</p>
        <div>
          <RadioGroup name={`${id}-question`}>
            {alternatives.map((alternative, alternativeIndex) => (
              <div className='flex items-center mb-2 gap-2' key={`${id}-${alternativeIndex}`}>
                <RadioGroupItem value={`${alternative.letter}`} id={`${id}-${alternativeIndex}`} />
                <Label htmlFor={`${id}-${alternativeIndex}`}>
                  ({alternative.letter}) {alternative.file ? <Image src={alternative.file} alt={alternative.text} width={500} height={500} /> : alternative.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <input type="hidden" name={`${id}-answer`} value={alternatives.find(alt => alt.isCorrect)?.letter} />
        </div>
      </CardContent>
    </Card>
  </div >)
}