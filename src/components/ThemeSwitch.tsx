import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import translations from "@/lib/translations";

import lightIcon from "../images/light-icon.svg";
import darkIcon from "../images/dark-icon.svg";
import Image from "next/image";

const ThemeSwitch = ({ locale }: { locale: "fi" | "en" }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const icon = theme === "light" ? lightIcon : darkIcon;

  return (
    <div
      className="grid
      h-10 w-10 select-none
      place-items-center
      rounded-full border-2 border-white bg-gray-800
    bg-opacity-25 text-black
    hover:cursor-pointer dark:border-black
    dark:bg-gray-500 dark:bg-opacity-25 dark:text-white "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={translations.themeTooltip[locale]}
    >
      <Image src={icon} width={24} height={24} alt="theme" />
    </div>
  );
};
export default ThemeSwitch;
