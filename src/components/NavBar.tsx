import React from "react";
import LocaleSwitch from "./LocaleSwitch";
import ThemeSwitch from "./ThemeSwitch";
import TutorialButton from "./TutorialButton";

interface Props {
  className?: string;
  toggleTutorial: () => void;
  locale: "fi" | "en";
}

const Navbar = ({ className, toggleTutorial, locale }: Props) => {
  return (
    <nav
      className={`grid w-screen items-center border-b-2 border-black bg-gray-300 p-4 text-black dark:border-gray-500 dark:bg-neutral-800 dark:text-blue-500 ${className}`}
    >
      <h1 className="select-none sm:justify-self-center text-3xl font-semibold">Findle</h1>
      <div className="absolute right-4 flex items-center gap-2">
        <ThemeSwitch locale={locale} />
        <TutorialButton locale={locale} onClick={toggleTutorial} />
        <LocaleSwitch locale={locale} />
      </div>
    </nav>
  );
};

export default Navbar;
