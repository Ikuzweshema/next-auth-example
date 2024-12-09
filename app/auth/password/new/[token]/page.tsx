import { NewPasswordFrom } from "@/components/auth/new-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Password",
  description: "Reset Password Page - Next Auth Example",
};
export default async function Page(props: {
  params: Promise<{ token: string }>;
}) {
  const params = await props.params;
  const { token } = params;

  return (
    <div className=" flex h-screen justify-center flex-col w-full items-center">
      <NewPasswordFrom token={token} />
    </div>
  );
}
