import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Registration page -Next Auth Example",
};
export default function Page() {
  return (
    <div className=" flex justify-center flex-col mt-20">
      <RegisterForm />
    </div>
  );
}
