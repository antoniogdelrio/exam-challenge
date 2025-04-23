import InputCopy from "@/components/ui/input-copy";
import { verifyCode } from "@/lib/actions";
import { Check } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ code: string }> | { code: string }
}

export default async function Link({ searchParams }: PageProps) {
  const params = await searchParams

  const challengeLink = await verifyCode(params.code)
  return (
    <div>
      <main className="flex flex-col items-center mx-3">
        <h2 className="text-3xl font-bold mb-8">Desafio gerado!</h2>
        <p className="mb-6">Envie o link para um amigo</p>
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
    </div>
  );
}
