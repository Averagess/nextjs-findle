import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import IconDark from "@/images/SettingsDark.png";
import IconLight from "@/images/SettingsLight.png";

interface Props {
  onClick: () => void;
}

const SettingsButton = ({ onClick }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const icon = theme === "dark" ? IconLight : IconDark;

  return (
    <div
      onClick={onClick}
      className="grid
    h-10 w-10 select-none
    place-items-center
    rounded-full border-2 border-white dark:border-black
  bg-gray-800 bg-opacity-25
    text-3xl text-black hover:cursor-pointer
  dark:bg-gray-500 dark:bg-opacity-25 dark:text-white "
    >
      <Image width={20} height="20" src={icon} alt="settings" />
    </div>
  );
};
export default SettingsButton;
