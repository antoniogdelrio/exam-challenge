import Link from "next/link";
import InputCopy from "@/components/ui/input-copy";
import { verifyCode } from "@/lib/actions";
import { Check, Goal } from "lucide-react";
import { Button } from "@/components/ui/button";

type SearchParams = Promise<{ [key: string]: string }>

export default async function LinkPage(props: {
  searchParams: SearchParams
}) {
  const params = await props.searchParams

  const challengeLink = await verifyCode(params.code)
  return (
    <main className="flex flex-col items-center mx-3">
      <h2 className="text-3xl font-bold mb-8">Desafio gerado!</h2>
      <Button asChild className="w-full mb-8">
        <Link href={challengeLink}>Ir para o desafio <Goal /></Link>
      </Button>
      <p className="mb-6">ou envie o link para um amigo</p>
      <div className="flex flex-col gap-1 sm:flex-row w-full">
        <InputCopy
          ToastIcon={<Check />}
          toastMessage="Link copiado para a área de transferência"
          inputProps={{
            placeholder: "Copiar link",
            value: challengeLink
          }}
        />
      </div>
    </main>
  );
}
