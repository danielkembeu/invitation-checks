"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  loadingLabel?: string;
  btnLabel?: string;
};

export function SubmitButton({
  loadingLabel,
  btnLabel,
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? loadingLabel ?? "En cours..." : btnLabel ?? "Soumettre"}
    </Button>
  );
}
