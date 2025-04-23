'use client'

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface ISubmitButton {
  label: string;
  loadingLabel: string;
}

export default function SubmitButton({ label, loadingLabel }: ISubmitButton) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? loadingLabel : label}
    </Button>
  );
}