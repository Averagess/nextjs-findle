import React from "react";

interface Props {
  chars?: string;
  correctWord?: string;
  animate?: boolean;
}

const GuessContainer = ({ correctWord, animate, chars = "" }: Props) => {

  const charBoxes = new Array(5).fill(null).map((_, i) => {
    const currChar = chars[i] ?? "";
    const char = currChar.toUpperCase();
    const doAnimation = animate === true || animate === undefined;
    const style = { animation: "none" };

    let isCorrect = false;
    let isAlmost = false;

    if (doAnimation && correctWord) {
      isCorrect = char === correctWord[i].toUpperCase();
      isAlmost = correctWord.includes(char.toUpperCase());
      const flipType = isCorrect
        ? "flip-green"
        : isAlmost
        ? "flip-orange"
        : "flip-gray";
      style.animation = `0.5s ${flipType} ${0.5 * (i + 1)}s ease-in both`;
    } else if (correctWord) {
      isCorrect = char === correctWord[i].toUpperCase();
      isAlmost = correctWord.includes(char.toUpperCase());
    }


    return (
      <div
        key={i}
        style={style}
        className={`
          m-[1px] grid
          h-12 w-12
          place-items-center rounded-md
          border-[1px] border-black border-opacity-25
          bg-opacity-80 dark:bg-opacity-60
          dark:border-white
          ${isCorrect ? "bg-green-500" : isAlmost ? "bg-orange-400" : "bg-neutral-400 dark:bg-neutral-700"}
          `}
      >
        <p className="text-3xl font-bold text-white">{char}</p>
      </div>
    );
  });

  return <div className="flex">{charBoxes}</div>;
};

export default GuessContainer;
