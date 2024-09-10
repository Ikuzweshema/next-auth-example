"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useFormStatus, useFormState } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
export function LoginForm() {

  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <Image src={"/logo.png"} height={125} width={125} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
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
            <Input id="password" type="password" required />
          </div>
          <SubmitButton />
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
      </CardContent>
    </Card>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{" "}
      {pending ? "LoggingIn..." : "Login"}
    </Button>
  );
}
