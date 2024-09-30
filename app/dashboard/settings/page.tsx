import Settings from "@/components/settings";
import{Card,CardContent,CardHeader,CardFooter,CardDescription,CardTitle} from "@/components/ui/card"
export default function Page() {
  return <div className={" mt-10 flex  justify-center"}>
  <Card className={ "w-[43vw] flex-col"}>
      <CardHeader>
          <CardTitle className={"flex justify-center"}>Settings</CardTitle>
      </CardHeader>
      <CardContent>
            <Settings/>
      </CardContent>
  </Card>
</div>;
}
