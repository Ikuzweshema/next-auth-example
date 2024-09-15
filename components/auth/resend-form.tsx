"use client";

import { Button } from "@/components/ui/button";
import {  ShieldEllipsis } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { getUserByAndResend } from "@/lib/actions";
import AlertMessage from "@/components/auth/alert";

export default function ResendForm({ token }: { token: string }) {
  const [status, dispatch] = useFormState(getUserByAndResend, undefined);
  return (
    <div>
      <form action={dispatch}>
        <input type={"hidden"} name={"token"} value={token} />
        <SubmitButton />
      </form>
      {status?.status ? (
       <AlertMessage {...status}/>
      ) : (
        ""
      )}
    </div>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type={"submit"} disabled={pending} variant={"outline"}>
      <ShieldEllipsis size={16} /> Get Anew one
    </Button>
  );
}
