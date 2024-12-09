import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page(props: {
  searchParams: Promise<{ error: string }>;
}) {
  const searchParams = await props.searchParams;
  const { error } = searchParams;
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            <Image src={"/logo.png"} height={125} width={125} alt="logo" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Alert variant={"destructive"}>
                  <AlertTitle className={"rounded-md flex justify-center"}>
                    <TriangleAlert size={60} />
                  </AlertTitle>
                  <AlertDescription className={"mt-3 flex justify-center"}>
                    <span className={"text-md"}>
                      {error || "something went wrong"}
                    </span>
                  </AlertDescription>
                </Alert>
                <Button asChild variant={"outline"}>
                  <Link href="/auth/login">Login Again</Link>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
