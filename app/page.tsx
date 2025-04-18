import ChallengeForm from "@/components/challenge-form";
import SubmitButton from "@/components/submit-button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formSubmitAction } from "@/lib/actions";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center mt-4">
        <form action={formSubmitAction}>
          <Card className="w-full">
            <CardHeader>
              Selecione o número de questões e as disciplinas.
            </CardHeader>
            <CardContent>
              <ChallengeForm />
            </CardContent>
            <CardFooter className="flex justify-end">
              <SubmitButton />
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}
