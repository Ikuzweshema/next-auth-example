"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useFormStatus, useFormState } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import {authenticate} from "@/lib/actions";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {CheckCheck, ShieldAlert} from "lucide-react";
export function LoginForm() {
 const [status,dispatch]=useFormState(authenticate,undefined)
  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <Image src={"/logo.png"} height={125} width={125} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={dispatch}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name={"email"}
                  required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password"  name={"password"} required/>
            </div>
            <SubmitButton/>
            {status?.status ? (
                <Alert
                    variant={status?.status === "error" ? "destructive" : "default"}
                    className={status.status === "success" ? "bg-green-700" : ""}
                >
                  <AlertDescription className={"flex gap-2"}>
                    {status?.status === "error" ? (
                        <ShieldAlert />
                    ) : (
                        <CheckCheck />
                    )}{" "}
                    {status?.message}
                  </AlertDescription>
                </Alert>
            ) : (
                ""
            )}
            <div className=" flex gap-1">
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              <Button variant="outline" className="w-full">
                Login with Github
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
);
}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full disabled:cursor-not-allowed">
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{" "}
      {pending ? "LoggingIn..." : "Login"}
    </Button>
  );
}
