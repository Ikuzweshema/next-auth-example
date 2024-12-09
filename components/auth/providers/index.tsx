import Provider from "@/components/auth/providers/provider";

export default function Providers() {
  return (
    <div className="flex flex-col w-full gap-1">
      <Provider name={"github"} />
      <Provider name={"google"} />
    </div>
  );
}
