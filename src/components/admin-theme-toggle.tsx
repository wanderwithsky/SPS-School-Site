import { Moon, Sun } from "lucide-react";
import { useAdminTheme } from "./admin-theme-provider";

export function AdminThemeToggle() {
  const { theme, setTheme } = useAdminTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-[#1B1B1B] dark:text-slate-300 dark:hover:bg-[#2A2A2A] dark:border dark:border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e1c3f]"
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
