import { useTheme } from "next-themes";
import { Switch } from "../ui/toggle";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(false);
  function toggleMode() {
    setTheme(theme === "dark" ? "light" : "dark");
    setChecked(!checked);
    return;
  }
  useEffect(() => {
    setChecked(theme === "dark");
  }, []);
  return (
    <div className="flex gap-2">
      <Switch
        onClick={toggleMode}
        checked={checked}
        className=" bg-foreground"
      />
    </div>
  );
}
