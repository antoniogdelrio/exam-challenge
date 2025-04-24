import { Loader2 } from "lucide-react";

export default function Loading() {
  return <div className="flex flex-col items-center justify-center mt-6 gap-4">
    <p className="text-center">Estamos criando o seu desafio, isso pode levar alguns segundos...</p>
    <Loader2 className="w-8 h-8 animate-spin" />
  </div >
}