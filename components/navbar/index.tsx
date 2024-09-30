"use client";
import Link from "next/link";
import { Package2, Settings } from "lucide-react";

import React from "react";
import { ModeToggle } from "@/components/providers/toogle-mode";

export default function Navbar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-80 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col  gap-6 px-4 py-10">
        <Link
          href="/dashboard"
          className="flex gap-2  text-muted-foreground transition-colors hover:text-foreground"
        >
          <Package2 className=" transition-all group-hover:scale-110" />
          <span>Dashboard</span>
          <span className="sr-only">Dashboard</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex gap-2 items-center    text-muted-foreground transition-colors hover:text-foreground "
        >
          <Settings />
          <span>Settings</span>
          <span className="sr-only">Settings</span>
        </Link>
      </nav>

      <nav className="mt-auto flex flex-col  gap-4 px-2 sm:py-4">
        <ModeToggle />
      </nav>
    </aside>
  );
}
