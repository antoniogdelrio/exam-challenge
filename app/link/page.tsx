import InputCopy from "@/components/ui/input-copy";
import { Check } from "lucide-react";

export default function Link() {
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
              value: "http://localhost/ewe9fw5f9w5fw9ef5"
            }}
          />
        </div>
      </main>
    </div>
  );
}
