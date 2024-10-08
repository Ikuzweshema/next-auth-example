import Settings from "@/app/dashboard/settings/settings";
import SettingsSkeleton from "@/components/skeletons/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
export default function Page() {
  return (
    <div className={" mt-10 flex  justify-center"}>
      <Card className={"w-[43vw] flex-col"}>
        <CardHeader>
          <CardTitle className={"flex justify-center"}>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<SettingsSkeleton />}>
            <Settings />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
