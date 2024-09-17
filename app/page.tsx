import { AlertDescription, AlertTitle,Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Card className="mx-auto w-[45vw]  mt-24">
    <CardHeader>
      <CardTitle className="text-2xl flex justify-center">
        <Image src={"/logo.png"} height={140} width={135} alt="logo" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Alert variant={"default"}>
            <AlertTitle className={"rounded-md flex justify-center text-lg"}>
            Welcome to next Auth Example App
            </AlertTitle>
            <AlertDescription className={"mt-3 flex justify-center"}>
              <span className={"text-md"}>
                To get Started Please login
              </span>
            </AlertDescription>
          </Alert>
          <Button  asChild variant={"outline"}>
            <Link className="" href="/auth/login">Login</Link>   
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
  );
}
