"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {  TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={"flex justify-center mt-20"}>
      <div className="flex flex-col w-[42vw] gap-4">
        <div className="flex flex-col gap-2">
          <Alert variant={"destructive"}>
            <AlertTitle className={"rounded-md flex justify-center"}>
              <TriangleAlert size={60} />
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
    </div>
  );
}
