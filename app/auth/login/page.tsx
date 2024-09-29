import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page-Next Auth Example",
};
export default function Page() {
  return (
    <div className=" flex justify-center flex-col mt-20">
      <LoginForm />
    </div>
  );
}
