"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";
import { updateUser } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";

interface SettingsProps {
  session: Session | null;
}
export default function SettingsForm({ session }: SettingsProps) {
  const [enabled, setEnabled] = useState(
    session?.user.twoFactorEnabled || false
  );
  const { toast } = useToast();
  const [status, dispatch] = useFormState(updateUser, undefined);
  useEffect(() => {
    if (!status) {
      return;
    }
    toast({
      title: status.status.toLocaleUpperCase(),
      description: status.message,
      duration: 2000,
      variant: status.status == "error" ? "destructive" : "default",
    });
    return;
  }, [status]);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and two factor Authentication.
        </p>
      </div>
      <form className="space-y-8" action={dispatch}>
        <div className="space-y-4">
          <input type="hidden" name="id" value={session?.user.id} />
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={session?.user.name ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              defaultValue={session?.user.email ?? ""}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="notifications"
            checked={enabled}
            onCheckedChange={setEnabled}
            name="enabled"
          />
          <input
            type="hidden"
            name="twoFactorEnabled"
            value={enabled ? "true" : 0}
          />
          <Label htmlFor="notifications">Two factor Authentication</Label>
        </div>
        <div className="flex justify-center">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Saving.." : "Save changes"}
    </Button>
  );
}
