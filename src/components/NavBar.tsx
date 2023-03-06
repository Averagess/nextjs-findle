import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import TutorialButton from "./TutorialButton";

interface Props {
  className?: string;
  toggleTutorial: () => void;
}

const Navbar = ({ className, toggleTutorial }: Props) => {
  return (
    <nav
      className={`grid w-screen border-b-2 border-black dark:border-gray-500 items-center justify-items-center bg-gray-300 p-4 text-black dark:bg-neutral-800 dark:text-blue-700 ${className}`}
      >
      <h1 className="select-none text-3xl font-semibold">Findle</h1>
      <div className="absolute right-4 flex gap-2 items-center">
        <ThemeSwitch />
        <TutorialButton onClick={toggleTutorial} />
      </div>
    </nav>
  );
};

export default Navbar;
