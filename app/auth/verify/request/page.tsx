import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification",
  description: "Email Verification Request Page Next-Auth Example",
};
export default function Page() {
  return (
    <Card className="mx-auto w-[35vw] mt-24">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <Image src="/logo.png" height={125} width={125} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Alert variant="ghost">
              <AlertTitle className="rounded-md flex justify-center">
                <Mail size={60} />
              </AlertTitle>
              <AlertDescription className="mt-3 flex flex-col items-center text-center">
                <span className="text-lg font-semibold mb-2">
                  Check Your Email
                </span>
                <span className="text-md">
                  A sign-in link has been sent to your email address.
                </span>
              </AlertDescription>
            </Alert>
            <div className="flex  justify-center ">
              <Button className="w-52" asChild variant="default">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
