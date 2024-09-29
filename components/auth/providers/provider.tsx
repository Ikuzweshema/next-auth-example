"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import signInWithProvider from "@/lib/actions";
import { ReloadIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import AlertMessage from "@/components/auth/alert";
import Image from "next/image";
import { BuiltInProviderType } from "@auth/core/providers";

type ProviderProps = {
  name: BuiltInProviderType;
};
export default function Provider({ name }: ProviderProps) {
  const [status, dispatch] = useFormState(signInWithProvider, undefined);
  return (
    <div className="grid gap-2 w-full">
      <form action={dispatch}>
        <input type={"hidden"} name={"provider"} value={name.toLocaleLowerCase()} />
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
      className={"w-full flex gap-2"}
      type={"submit"}
    >
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{" "}
      {name === "google" ? (
        <Image src={"/Google.png"} width={22} alt={"google"} height={22} />
      ) : (
        <GitHubLogoIcon />
      )}
      Continue with {name}
    </Button>
  );
}
