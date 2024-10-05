import { NewPasswordFrom } from "@/components/auth/new-password-form";
import { console } from "inspector";
import { Metadata } from "next";
export const meatada: Metadata = {
    title: "New Password",
    description: "Reset Password Page - Next Auth Example"
}
export default function Page({ params }: { params: { token: string } }) {
    const { token } = params
    console.log("hii")
    return (<div className=" flex justify-center flex-col mt-20">
        <NewPasswordFrom token={token} />
    </div>)
}