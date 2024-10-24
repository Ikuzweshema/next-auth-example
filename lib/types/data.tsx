import { BuiltInProviderType } from "@auth/core/providers";
import { LucideIcon } from "lucide-react";
import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
type Providers = {
  name: BuiltInProviderType;
  display: React.ReactNode;
};
const providers: Providers[] = [
  {
    name: "google",
    display: (
      <Image src={"/Google.png"} width={22} alt={"google"} height={22} />
    ),
  },
  {
    name: "github",
    display: <GitHubLogoIcon className="w-6 h-6" />,
  },
];

export { providers };
