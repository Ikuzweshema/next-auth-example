"use client";
import { Button } from "@/components/ui/button";
import { ShieldEllipsis } from "lucide-react";
import { getUserAndResendToken } from "@/lib/actions";
import AlertMessage from "@/components/auth/alert";
import { useActionState } from "react";

export default function ResendForm({ token }: { token: string }) {
  const [status, dispatch, pending] = useActionState(
    getUserAndResendToken,
    undefined
  );
  return (
    <div className="w-full">
      <form action={dispatch}>
        <input type={"hidden"} name={"token"} value={token} />
        <Button type={"submit"} disabled={pending} variant={"outline"}>
          <ShieldEllipsis size={16} /> Resend
        </Button>
      </form>
      {status?.status && <AlertMessage {...status} />}
    </div>
  );
}
