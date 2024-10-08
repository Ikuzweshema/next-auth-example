import InputField from "./input-field";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signInWithSendgrid } from "@/lib/actions";
import AlertMessage from "./alert";
export default function EmailForm() {
  const [status, dispatch] = useFormState(signInWithSendgrid, undefined);
  return (
    <form action={dispatch} className={"flex flex-col gap-4"}>
      <input type="hidden" name="provider" value={"sendgrid"} />
      <InputField label="Email" name="email" type="email" placeholder="email@example.com" />
      <SubmitButton />
      {status?.status ? <AlertMessage {...status} /> : null}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full disabled:cursor-not-allowed"
    >
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "LoggingIn..." : "Continue with Email"}
    </Button>
  );
}
