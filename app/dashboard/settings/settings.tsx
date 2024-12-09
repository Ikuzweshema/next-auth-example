import { auth } from "@/app/auth";
import SettingsForm from "@/components/settings";
import { type Session } from "next-auth";
import { getUserById } from "@/lib/actions/actions";
import { notFound } from "next/navigation";

export default async function Session() {
  const session = await auth();
  const user = await getUserById(session?.user.id as string);
  if (!user) return notFound();

  return <SettingsForm user={user} />;
}
