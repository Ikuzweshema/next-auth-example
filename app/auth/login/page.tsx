import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page-Next Auth Example",
};
export default function Page() {
  return (
    <div className=" flex justify-center flex-col my-6 p-2">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
