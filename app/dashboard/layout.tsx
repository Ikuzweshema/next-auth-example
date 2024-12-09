import React from "react";
import User from "@/components/navbar/user";
import Navbar from "@/components/navbar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "The Dashboard of the Next auth example",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full  bg-muted/40 p-2">
      <div className="w-1/4">
        <Navbar />
      </div>
      <div className="flex-grow   sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-end">
          <User />
        </header>
        <main className="flex flex-col w-full ">{children}</main>
      </div>
    </div>
  );
}
