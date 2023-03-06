interface Props {
  chars: string[];
  onClick: (char: string) => void;
  correctChars: { [key: string]: string };
  almostChars: { [key: string]: string };
  gameOver: boolean;
}

const KeyboardRow = ({ chars, onClick, correctChars, almostChars, gameOver }: Props) => {
  const keys = chars.map((char) => {
    const animationStyle = correctChars[char]
      ? "to-green"
      : almostChars[char]
      ? "to-orange"
      : null;

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
          h-12 w-7
          md:h-15 md:w-10
          min-w-fit rounded-md border-2 border-white
          border-opacity-30
          bg-neutral-700
          bg-opacity-60 active:bg-neutral-600
          font-semibold text-white
          shrink-0
          ${char.length > 1 && "px-2 text-sm"}
        `}
      >
        {char}
      </button>
    );
  });

  return <div className="flex justify-center w-full flex-wrap gap-1">{keys}</div>;
};
export default KeyboardRow;
