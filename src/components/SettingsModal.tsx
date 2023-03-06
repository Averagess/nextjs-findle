import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SettingsModal = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`container relative h-[80vh] animate-rise place-self-center overflow-y-auto rounded-xl text-dark bg-white dark:bg-neutral-800 p-10 dark:text-white`}
    >
      <h1>Settings</h1>
      <hr />
      <h2>Theme</h2>
      <div className="flex flex-row gap-5">
        <button
          onClick={() => setTheme("dark")}
          className={`
            w-26 rounded-xl border-2
          ${theme === "dark" ? "border-yellow-500": "border-cyan-500"}
          dark:bg-white bg-black bg-opacity-40
          dark:bg-opacity-10 py-2 px-6 
          text-center active:border-yellow-200
          `}
        >
          tumma
        </button>
        <button
          onClick={() => setTheme("light")}
          className={`
            w-26 rounded-xl border-2
          ${theme === "light" ? "border-yellow-500" : "border-cyan-500"} 
          dark:bg-white bg-black bg-opacity-40
          dark:bg-opacity-10 py-2 px-6 
          text-center active:border-yellow-200
          `}
        >
          vaalea
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
