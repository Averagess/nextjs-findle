interface Props {
  chars: string[];
  onClick: (char: string) => void;
  correctChars: { [key: string]: string };
  almostChars: { [key: string]: string };
  incorrectChars: { [key: string]: string };
  gameOver: boolean;
}

const KeyboardRow = ({
  chars,
  onClick,
  correctChars,
  almostChars,
  incorrectChars,
  gameOver,
}: Props) => {
  const keys = chars.map((char) => {
    let animationStyle: string | null = null;

    if (correctChars[char]) animationStyle = "to-green";
    else if (almostChars[char]) animationStyle = "to-orange";
    else if (incorrectChars[char]) animationStyle = "to-gray";

    const style = {
      animation: animationStyle
        ? `2.5s ${animationStyle} ease-in both`
        : "none",
    };

    return (
      <button
        style={style}
        onClick={() => onClick(char)}
        key={char}
        disabled={gameOver}
        className={`
          md:h-15 shrink-1
          h-12
          min-w-fit rounded-md border-2 border-white
          bg-neutral-500 font-semibold text-white
          dark:border-opacity-30
          dark:bg-neutral-500 dark:bg-opacity-60
          ${char.length > 4 && "px-2 text-xs"}
          ${char.length >= 4 ? "w-16" : "w-7 md:w-10"}
        `}
      >
        {char.length > 1 && char === "BACK" ? "⌫" : char}
      </button>
    );
  });

  return (
    <div className="flex w-full flex-nowrap justify-center gap-1">{keys}</div>
  );
};
export default KeyboardRow;
