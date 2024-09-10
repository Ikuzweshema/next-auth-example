import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {auth} from "@/app/auth";
export default async function Page() {
    const  session=await auth()
    return <div className={" mt-10 flex flex-col justify-center"}>
        <Card className={ "w-96 flex-col"}>
            <CardHeader>
                <CardTitle>Your Session</CardTitle>
            </CardHeader>
            <CardContent>
               <pre>{JSON.stringify(session,null,2)}</pre>
            </CardContent>
        </Card>
    </div>
}