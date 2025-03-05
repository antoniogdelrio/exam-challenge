import { Button } from "@/components/ui/button";
import { Facebook, Twitter } from "lucide-react";

export default function Result() {
  return (
    <>
      <h2 className="text-3xl font-medium text-center mb-12">Parabéns!</h2>

      <p className="text-2xl font-medium text-center mb-12">Você acertou 8 de 8 questões!</p>

      <p className="text-2xl font-medium text-center mb-8">Compartilhe com seus amigos</p>

      <div className="flex justify-center gap-6">
        <Button><Facebook /></Button>
        <Button><Twitter /></Button>
      </div>
    </>
  )
}