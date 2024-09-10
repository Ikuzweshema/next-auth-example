import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function Page() {
    const session={
        name:"Shema",
        id:"239831",
        email:"Shema@shema.com"
    }
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