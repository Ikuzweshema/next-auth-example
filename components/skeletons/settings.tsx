import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"

export default function SettingsSkeleton() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <Skeleton className="h-7 w-24 mb-1" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch disabled />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}