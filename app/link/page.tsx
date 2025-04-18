import InputCopy from "@/components/ui/input-copy";
import VerifyCode from "@/lib/usecases/VerifyCode";
import { Check } from "lucide-react";
import { permanentRedirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ code: string }> | { code: string }
}

export default async function Link({ searchParams }: PageProps) {
  const params = await searchParams

  const verifyCode = new VerifyCode()
  const { isValid } = await verifyCode.execute({ code: params.code })

  if (!isValid) {
    permanentRedirect('/')
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const challengeLink = `${baseUrl}/exam/${params.code}`

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
