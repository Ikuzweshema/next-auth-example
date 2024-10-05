import { ResetPasswordFrom } from "@/components/auth/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset Password Page - Next Auth Example"
}

export default async function Page() {

    return <div className=" flex justify-center flex-col mt-20">
        <ResetPasswordFrom />
    </div>
}