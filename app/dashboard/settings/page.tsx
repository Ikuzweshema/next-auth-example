import Settings from "@/app/dashboard/settings/settings";
import SettingsSkeleton from "@/components/skeletons/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
export default function Page() {
  return (
    <div className={"flex-col justify-center items-center"}>
      <Card className={"w-full flex-col max-w-2xl rounded-md"}>
        <CardHeader>
          <CardTitle className={"flex justify-center"}>Settings</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <Suspense fallback={<SettingsSkeleton />}>
            <Settings />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
