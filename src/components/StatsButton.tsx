import translations from "@/lib/translations";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import darkLeaderboard from "../images/leaderboard-dark.svg";
import whiteLeaderboard from "../images/leaderboard-white.svg";

interface Props {
  locale: "fi" | "en";
  onClick: () => void;
}

const StatsButton = ({ locale, onClick }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted) return null

  const icon = theme === "light" ? whiteLeaderboard : darkLeaderboard

  return (
    <div
      title={translations.statistics[locale].toLocaleLowerCase()}
      onClick={onClick}
      className={`
  grid
  h-10 w-10 select-none
  place-items-center
  rounded-full border-2 border-white bg-gray-800
bg-opacity-25 text-3xl
  text-black hover:cursor-pointer dark:border-black
dark:bg-gray-500 dark:bg-opacity-25 dark:text-white `}
    >
      <Image src={icon} width={24} height={24} alt={translations.statistics[locale]} />
    </div>
  );
};

export default StatsButton;
