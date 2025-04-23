import ChallengeForm from "@/components/challenge-form";
import { createChallenge } from "@/lib/actions";

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-4">
      <ChallengeForm createChallengeAction={createChallenge} />
    </main>
  );
}
