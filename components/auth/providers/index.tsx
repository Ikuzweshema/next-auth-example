
import Provider from "@/components/auth/providers/provider";

export default function Providers() {
  return (
    <div className="  grid  w-full gap-1">
      <Provider name={"Google"} />
      <Provider name={"Github"} />
    </div>
  );
}
