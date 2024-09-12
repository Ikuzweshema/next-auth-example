import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCheck, ShieldAlert } from "lucide-react";
import { verifyToken } from "@/lib/actions";
import Link from "next/link";
export default async function Page({ params }: { params: { token: string } }) {
  const status = await verifyToken(params.token);

  console.log(status);
  return (
    <Card className="mx-auto w-96 mt-16">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <Image src={"/logo.png"} height={125} width={125} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Alert
                variant={
                  status.status === "success" ? "default" : "destructive"
                }
              >
                <AlertTitle
                  className={`${status.status === "success" ? "bg-green-600" : ""}  rounded-md flex justify-center`}
                >
                  {status.status === "success" ? (
                    <CheckCheck size={80} />
                  ) : (
                    <ShieldAlert size={60} />
                  )}
                </AlertTitle>
                <AlertDescription className={"mt-3"}>
                  <span className={"text-md"}>{status.message}</span>
                </AlertDescription>
              </Alert>
              {status.status === "success" ? (
                <center>
                  {" "}
                  You can Login{" "}
                  <Link href={"/auth/login"} className={"underline"}>
                    here
                  </Link>
                </center>
              ) : (
                <center>
                  {" "}
                  Get anew one{" "}
                  <Link href={"/auth/login"} className={"underline"}>
                    here
                  </Link>
                </center>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
