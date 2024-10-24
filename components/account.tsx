import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Account } from "@prisma/client";
import { User } from "@prisma/client";
import { BuiltInProviderType } from "@auth/core/providers";
import { capitalize } from "@/lib/utils";
import { useFormState, useFormStatus } from "react-dom";
import { connectProvider, removeProvider } from "@/lib/actions";
import { useEffect } from "react";
import { useToast } from "@/lib/hooks/use-toast";
interface AccountProps {
  user: User & { accounts: Account[] };
  name: BuiltInProviderType;
  display: React.ReactNode;
}
export default function AccountForm({ name, user, display }: AccountProps) {
  const { toast } = useToast();
  function connected() {
    return user.accounts.some((account) => account.provider === name);
  }

  const [status, dispatch] = useFormState(
    connected() ? removeProvider : connectProvider,
    undefined
  );

  useEffect(() => {
    if (!status) {
      return;
    }
    toast({
      title: status.status.toUpperCase(),
      description: status.message,
      duration: 2000,
      variant: status.status == "error" ? "destructive" : "default",
    });
    return;
  }, [status, toast]);
  return (
    <div className="flex justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-4">
        {display}
        <div>
          <p className="text-sm font-medium">{capitalize(name)}</p>
          <p className="text-xs text-muted-foreground">
            {connected()
              ? ` Connected as ${user.name}`
              : `Connect your ${name} account`}
          </p>
        </div>
      </div>
      <form action={dispatch}>
        <input type="hidden" name="provider" value={name} />
        <input type="hidden" name="userId" value={user.id} />
        <Submit connected={connected()} />
      </form>
    </div>
  );
}

function Submit({ connected }: { connected: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant={connected ? "destructive" : "default"}
      size="sm"
    >
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {connected ? "Remove" : "Connect"}
    </Button>
  );
}
