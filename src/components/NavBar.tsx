import React from "react";

interface Props {
  className?: string;
  toggleTutorial: () => void;
}

const Navbar = ({ className, toggleTutorial }: Props) => {
  return (
    <nav className={`grid w-screen bg-neutral-800 text-blue-700 items-center justify-items-center p-4 ${className}`}>
      <h1 className="text-3xl select-none font-semibold">Findle</h1>
      <div onClick={toggleTutorial} className="absolute select-none hover:cursor-pointer grid bg-gray-500 bg-opacity-25 place-items-center border-white rounded-full border-2 w-10 h-10 text-3xl text-white right-4 ">
        <p>?</p>
      </div>
    </nav>
  );
};

export default Navbar;
