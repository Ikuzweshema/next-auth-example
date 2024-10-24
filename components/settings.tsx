"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";
import { updateUser } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Account, User } from "@prisma/client";
import AccountForm from "./account";
import { providers } from "@/lib/types/data";

interface SettingsProps {
  user: User & { accounts: Account[] };
}
export default function SettingsForm({ user }: SettingsProps) {
  const { email, image, id, name, twoFactorEnabled } = user;
  const [enabled, setEnabled] = useState(twoFactorEnabled);
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
  }, [status, toast]);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and two factor Authentication.
        </p>
      </div>
      <form className="space-y-4" action={dispatch}>
        <div className="space-y-3">
          <input type="hidden" name="id" value={id} />
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={name ?? ""} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              defaultValue={email ?? ""}
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
      <div className="space-y-2">
        <h5 className="text-center font-medium">Connected Accounts</h5>
      </div>
      <div className="space-y-2">
        {providers.map((provider) => (
          <AccountForm
            name={provider.name}
            key={provider.name}
            display={provider.display}
            user={user}
          />
        ))}
      </div>
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
