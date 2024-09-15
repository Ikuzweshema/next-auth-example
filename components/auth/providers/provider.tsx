"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import signInWithProvider from "@/lib/actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import AlertMessage from "@/components/auth/alert";

type ProviderProps = {
  name: string;
};
export default function Provider({ name }: ProviderProps) {
  const [status, dispatch] = useFormState(signInWithProvider, undefined);
  return (
    <div className="grid gap-2 w-full">
      <form action={dispatch}>
        <input type={"hidden"} name={""} />
        <SubmitButton name={name} />
      </form>
      {status?.status && <AlertMessage {...status} />}
    </div>
  );
}

function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant="outline"
      className={"w-full"}
      type={"submit"}
    >
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Login
      with {name}
    </Button>
  );
}
