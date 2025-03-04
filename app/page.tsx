import ChallengeForm from "@/components/challenge-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center mt-4">
        <Card className="w-full">
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
