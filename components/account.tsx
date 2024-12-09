import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Account } from "@prisma/client";
import { User } from "@prisma/client";
import { BuiltInProviderType } from "@auth/core/providers";
import { capitalize } from "@/lib/utils";
import { connectProvider, removeProvider } from "@/lib/actions";
import { useActionState, useEffect } from "react";
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
  const [status, dispatch, pending] = useActionState(
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
  const isConnected = connected();
  return (
    <div className="flex w-full justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-4">
        {display}
        <div>
          <p className="text-sm font-medium">{capitalize(name)}</p>
          <p className="text-xs text-muted-foreground">
            {isConnected
              ? ` Connected as ${user.name}`
              : `Connect your ${name} account`}
          </p>
        </div>
      </div>
      <form action={dispatch}>
        <input type="hidden" name="provider" value={name} />
        <input type="hidden" name="userId" value={user.id} />
        <Button
          disabled={pending}
          variant={isConnected ? "destructive" : "default"}
          size="sm"
        >
          {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isConnected ? "Remove" : "Connect"}
        </Button>
      </form>
    </div>
  );
}
