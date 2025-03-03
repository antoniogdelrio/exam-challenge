import ChallengeForm from "@/components/challenge-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center mx-3 mt-4">
        <h1 className="text-4xl font-bold mb-8">Exam Challenge</h1>
        <Card className="max-w-[500px]">
          <CardHeader>
            Selecione o número de questões e os cadernos.
          </CardHeader>
          <CardContent>
            <ChallengeForm />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Criar</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
