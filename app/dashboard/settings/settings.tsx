import { auth } from "@/app/auth";
import SettingsForm from "@/components/settings";
import { type Session } from "next-auth";

export default async function Session() {
  const session = await auth();

  return <SettingsForm session={session } />;
}
