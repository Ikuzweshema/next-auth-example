"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useFormStatus, useFormState } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import {verifyPasswordToken } from "@/lib/actions";
import AlertMessage from "@/components/auth/alert";
import InputField from "./input-field";
export function NewPasswordFrom({ token }: { token: string }) {
    const [status, dispatch] = useFormState(verifyPasswordToken, undefined);
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
                        <input type="hidden" name="token" value={token} />
                        <InputField label="New Password" type="password" name="password" placeholder="New Pasword..." />
                        <InputField label="Confirm Pasword" type="password" name="cpassword" placeholder="Confrim your password..." />
                        <SubmitButton />
                        {status?.status && <AlertMessage {...status} />}
                    </form>

                </div>

                <div className="mt-4 text-center text-sm">
                    Back to login form?
                    <Link href="/auth/login" className="underline">
                        Login
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
            {pending ? "Changing..." : "Change"}
        </Button>
    );
}
