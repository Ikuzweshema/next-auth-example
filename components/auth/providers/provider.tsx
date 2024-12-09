"use client";
import { Button } from "@/components/ui/button";
import signInWithProvider from "@/lib/actions";
import { ReloadIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import AlertMessage from "@/components/auth/alert";
import Image from "next/image";
import { BuiltInProviderType } from "@auth/core/providers";
import { useActionState } from "react";

type ProviderProps = {
  name: BuiltInProviderType;
};
export default function Provider({ name }: ProviderProps) {
  const [status, dispatch, pending] = useActionState(
    signInWithProvider,
    undefined
  );
  return (
    <div className="flex flex-col gap-2 w-full">
      <form action={dispatch} className="w-full">
        <input
          type={"hidden"}
          name={"provider"}
          value={name}
        />
        <Button
          disabled={pending}
          variant={name==="google" ? "default":"outline"}
          className={"w-full flex gap-2"}
          type={"submit"}
        >
          {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {name === "google" ? (
            <Image src={"/Google.png"} width={22} alt={"google"} height={22} />
          ) : (
            <GitHubLogoIcon />
          )}
          Continue with {name}
        </Button>
      </form>
      {status?.status && <AlertMessage {...status} />}
    </div>
  );
}
