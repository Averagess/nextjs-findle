import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const icon = theme === "dark" ? "🌙" : "☀️";

  return (
    <div
      className="grid
      h-10 w-10 select-none
      place-items-center
      rounded-full border-2 border-white dark:border-black
    bg-gray-800 bg-opacity-25
    text-black hover:cursor-pointer
    dark:bg-gray-500 dark:bg-opacity-25 dark:text-white "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Vaihda teemaa"
    >
      <h1>{icon}</h1>
    </div>
  );
};
export default ThemeSwitch;
