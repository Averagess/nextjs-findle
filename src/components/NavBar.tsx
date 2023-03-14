import React from "react";
import LocaleSwitch from "./LocaleSwitch";
import StatsButton from "./StatsButton";
import ThemeSwitch from "./ThemeSwitch";
import TutorialButton from "./TutorialButton";

interface Props {
  toggleTutorial: () => void;
  toggleStatistics: () => void;
  locale: "fi" | "en";
}

const Navbar = ({ toggleTutorial, toggleStatistics, locale }: Props) => {
  return (
    <nav
      className="
      flex flex-col items-center border-b-2
      border-black bg-gray-300 p-4
      text-black
      dark:border-gray-500 dark:bg-neutral-800 dark:text-blue-500"
    >
      <h1 className="select-none self-start text-3xl font-semibold sm:self-center">
        Findle
      </h1>
      <div className="absolute right-4 flex items-center gap-2">
        <StatsButton locale={locale} onClick={toggleStatistics} />
        <ThemeSwitch locale={locale} />
        <TutorialButton locale={locale} onClick={toggleTutorial} />
        <LocaleSwitch locale={locale} />
      </div>
    </nav>
  );
};

export default Navbar;
