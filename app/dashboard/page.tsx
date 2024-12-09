import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();
  return (
    <div className={" mt-10 flex  justify-center"}>
      <Card className={"w-full max-w-xl flex-col"}>
        <CardHeader>
          <CardTitle className={"flex justify-center"}>Your Session</CardTitle>
        </CardHeader>
        <CardContent>
          <pre >{JSON.stringify(session, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
