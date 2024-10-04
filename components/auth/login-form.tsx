"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useFormStatus, useFormState } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { authenticate } from "@/lib/actions";
import Providers from "@/components/auth/providers";
import AlertMessage from "@/components/auth/alert";
import InputField from "./input-field";
export function LoginForm() {
  const [status, dispatch] = useFormState(authenticate, undefined);
  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <Image src={"/logo.png"} height={125} width={125} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={dispatch} className={"flex flex-col gap-4"}>
            <InputField label="Email" type="email" name="email" placeholder="email@example.com" />
            <InputField  label="Password" name="password" type="password" placeholder="Enter your password.." />
            <Link
              href="#"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
            <SubmitButton />
            {status?.status && <AlertMessage {...status} />}
          </form>
          <Providers />
        </div>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full disabled:cursor-not-allowed"
    >
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "LoggingIn..." : "Login"}
    </Button>
  );
}
