import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Registration page -Next Auth Example",
};
export default function Page() {
  return (
    <div className=" flex justify-center flex-col  my-6 p-2">
      <RegisterForm />
    </div>
  );
}
