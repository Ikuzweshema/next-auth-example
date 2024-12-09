"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ReloadIcon } from "@radix-ui/react-icons";
import { sendPasswordResetToken } from "@/lib/actions";
import AlertMessage from "@/components/auth/alert";
import InputField from "./input-field";
import { useActionState } from "react";
export function ResetPasswordFrom() {
  const [status, dispatch,pending] = useActionState(sendPasswordResetToken, undefined);
  return (
    <Card className=" w-full max-w-md rounded-md">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <Image src={"/logo.png"} height={125} width={125} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={dispatch} className={"flex flex-col gap-4"}>
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="email@example.com"
            />
            <Button
              disabled={pending}
              type="submit"
              className="w-full disabled:cursor-not-allowed"
            >
              {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {pending ? "Sending..." : "Continue"}
            </Button>
            {status?.status && <AlertMessage {...status} />}
          </form>
        </div>

        <div className="mt-4 text-center text-sm">
          Back&apos;to login form?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
