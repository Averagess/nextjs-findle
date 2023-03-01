import React from "react";

interface Props {
  chars?: string;
  correctWord?: string;
  animate?: boolean;
}

const GuessContainer = ({ correctWord, animate, chars = "" }: Props) => {
  let charBoxes: JSX.Element[] = [];

  if (correctWord) {
    charBoxes = chars.toUpperCase().split("").map((char, i) => {
      const isCorrect = char === correctWord[i].toUpperCase();
      const isAlmost = correctWord.includes(char.toUpperCase())

      const flipType = isCorrect ? "flip-green" : isAlmost ? "flip-orange" : "flip-gray";
      const shouldAnimate = animate === true || animate === undefined;
      const style = {
        animation: shouldAnimate ? `0.5s ${flipType} ${0.5 * (i + 1)}s ease-in both` : "none",
      }

      return (
        <div
          key={i}
          style={style}

          className={`
          m-[1px] grid h-12 w-12
          place-items-center rounded-md border-[1px] border-white border-opacity-25
          bg-opacity-60
          ${isCorrect ? "bg-green-500" : isAlmost ? "bg-orange-400" : "bg-neutral-700"}
        `}
        >
          <p className="text-3xl font-bold text-white">{char}</p>
        </div>
      );
    });
  } else {
    for (let i = 0; i < 5; i++) {
      const char = chars[i];
      charBoxes.push(
        <div
          key={i}
          className="m-[1px] grid h-12 w-12 place-items-center rounded-md border-[1px] border-white border-opacity-25 bg-neutral-700 bg-opacity-60"
        >
          <p className="text-3xl font-bold text-white">{char}</p>
        </div>
      );
    }}
    
    return <div className="flex">{charBoxes}</div>;
};

export default GuessContainer;
