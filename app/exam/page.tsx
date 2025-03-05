import Question from '@/components/question'
import { Button } from '@/components/ui/button'

const question1 = {
  "title": "Questão 7 - ENEM 2020",
  "index": 7,
  "discipline": "linguagens",
  "language": null,
  "year": 2020,
  "context": "![](https://enem.dev/2020/questions/7/8cae3db7-3d36-4e39-a58d-1ae299222289.png)\n\nDisponível em: www.globofilmes.globo.com. Acesso em: 13 dez. 2017 (adaptado).",
  "files": [
    "https://enem.dev/2020/questions/7/8cae3db7-3d36-4e39-a58d-1ae299222289.png"
  ],
  "correctAlternative": "E",
  "alternativesIntroduction": "A frase, título do filme, reproduz uma variedade linguística recorrente na fala de muitos brasileiros. Essa estrutura caracteriza-se pelo(a)",
  "alternatives": [
    {
      "letter": "A",
      "text": "Uso de uma marcação temporal.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "B",
      "text": "Imprecisão do referente de pessoa.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "C",
      "text": "Organização interrogativa da frase.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "D",
      "text": "Utilização de um verbo de ação.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "E",
      "text": "Apagamento de uma preposição.",
      "file": null,
      "isCorrect": true
    }
  ]
}

const question2 = {
  "title": "Questão 20 - ENEM 2020",
  "index": 20,
  "discipline": "ciencias-humanas",
  "language": null,
  "year": 2020,
  "context": "**Por que a indústria do empreendedorismo de palco**  \n**irá destruir você**\n\nSe, antigamente, os livros, enormes e com suas setecentas páginas, cuspiam fórmulas, equações e cálculos que te ensinavam a lidar com o fluxo de caixa da sua empresa, hoje eles dizem: “Você irá chegar lá! Acredite, você irá vencer!”.\n\n_Mindset_, empoderamento, _millennials_, _networking_, coworking, _deal_, _business_, _deadline_, _salesman_ com perfil _hunter_… tudo isso faz parte do seu vocabulário. O pacote de livros é sempre idêntico e as experiências são passadas da mesma forma: você está a um único centímetro da vitória. Não pare!\n\nSe desistir agora, será para sempre. Tome, leia a estratégia do oceano azul. Faça mais uma mentoria, participe de mais uma sessão de _coaching_. O problema é que o seu _mindset_ não está ajustado. Você precisa ser mais proativo. Vamos fazer mais um _powermind_? Eu consigo um precinho bacana para você…\n\nCARVALHO, I. C. Disponível em: https//medium.com. Acesso em: 17 ago. 2017 (adaptado)",
  "files": [],
  "correctAlternative": "D",
  "alternativesIntroduction": "De acordo com o texto, é possível identificar o “empreendedor de palco” por",
  "alternatives": [
    {
      "letter": "A",
      "text": "Livros por ele indicados.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "B",
      "text": "Suas habilidades em língua inglesa.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "C",
      "text": "Experiências por ele compartilhadas.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "D",
      "text": "Padrões de linguagem por ele utilizados.",
      "file": null,
      "isCorrect": true
    },
    {
      "letter": "E",
      "text": "Preços acessíveis de seus treinamentos.",
      "file": null,
      "isCorrect": false
    }
  ]
}

const question3 = {
  "title": "Questão 140 - ENEM 2021",
  "index": 140,
  "discipline": "ciencias-humanas",
  "language": null,
  "year": 2021,
  "context": "Uma grande rede de supermercados adota um sistema de avaliação dos faturamentos de suas filiais, considerando a média de faturamento mensal em milhão. A matriz da rede paga uma comissão para os representantes dos supermercados que atingirem uma média de faturamento mensal (_M_), conforme apresentado no quadro.\n\n![](https://enem.dev/2021/questions/140/cbdf6628-0ce6-4923-adc0-4a603e947ba4.jpg)\n\nUm supermercado da rede obteve os faturamentos num dado ano, conforme apresentado no quadro.\n\n![](https://enem.dev/2021/questions/140/8211832d-2fa2-4b4f-b408-002d118ffe73.png)",
  "files": [
    "https://enem.dev/2021/questions/140/cbdf6628-0ce6-4923-adc0-4a603e947ba4.jpg",
    "https://enem.dev/2021/questions/140/8211832d-2fa2-4b4f-b408-002d118ffe73.png"
  ],
  "correctAlternative": "B",
  "alternativesIntroduction": "Nas condições apresentadas, os representantes desse supermercado avaliam que receberão, no ano seguinte a comissão de tipo",
  "alternatives": [
    {
      "letter": "A",
      "text": "I.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "B",
      "text": "II.",
      "file": null,
      "isCorrect": true
    },
    {
      "letter": "C",
      "text": "III.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "D",
      "text": "IV.",
      "file": null,
      "isCorrect": false
    },
    {
      "letter": "E",
      "text": "V",
      "file": null,
      "isCorrect": false
    }
  ]
}

export default function Exam() {
  return (
    <>
      <Question
        title={question1.title}
        discipline={question1.discipline}
        context={question1.context}
        index={question1.index}
        year={question1.year}
        alternativesIntroduction={question1.alternativesIntroduction}
        alternatives={question1.alternatives}
      />
      <Question
        title={question2.title}
        discipline={question2.discipline}
        context={question2.context}
        index={question2.index}
        year={question2.year}
        alternativesIntroduction={question2.alternativesIntroduction}
        alternatives={question2.alternatives}
      />
      <Question
        title={question3.title}
        discipline={question3.discipline}
        context={question3.context}
        index={question3.index}
        year={question3.year}
        alternativesIntroduction={question3.alternativesIntroduction}
        alternatives={question3.alternatives}
      />
      <div className='flex justify-end'>
        <Button className='mb-4'>
          Finalizar
        </Button>
      </div>
    </>
  )
}