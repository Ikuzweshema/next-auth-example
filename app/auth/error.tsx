"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Card className="mx-auto w-[45vw]  mt-24">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <Image src={"/logo.png"} height={125} width={125} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Alert variant={"destructive"}>
              <AlertTitle className={"rounded-md flex justify-center"}>
                <ShieldAlert size={60} />
              </AlertTitle>
              <AlertDescription className={"mt-3 flex justify-center"}>
                <span className={"text-md"}>
                  {error?.message || "something went wrong"}
                </span>
              </AlertDescription>
            </Alert>
            <Button onClick={() => reset()} variant={"outline"}>
              Retry
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
