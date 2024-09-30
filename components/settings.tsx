"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function Settings() {
  const [enabled, setEnabled] = useState(false);
  const session = useSession();
  const { toast } = useToast();

  function handleClick() {
    toast({
      variant: "default",
      title: "success",
      description: "Setting updated",
      duration: 2000,
    });
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and two factor Authentication.
        </p>
      </div>
      <form className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={session.data?.user.name ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={session.data?.user.email ?? ""}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="notifications"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
          <Label htmlFor="notifications">Two factor Authentication</Label>
        </div>
        <div className="flex justify-center">
          <Button type="button" onClick={handleClick}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
