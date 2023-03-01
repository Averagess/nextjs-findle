interface Props {
  handleKeyDown: (keyPressed: string) => void;
  guesses: string[];
  correctWord: string;
  className?: string;
}

const Keyboard = ({
  handleKeyDown,
  guesses,
  correctWord,
  className,
}: Props) => {
  const correctChars: { [key: string]: string } = {};
  const almostChars: { [key: string]: string } = {};

  guesses.forEach((guess) => {
    guess.split("").forEach((char, i) => {
      if (char === correctWord[i].toUpperCase()) {
        correctChars[char] = char;
      } else if (correctWord.includes(char.toUpperCase())) {
        almostChars[char] = char
      }
    });
  });

  const handleKeyPress = (e: React.MouseEvent<HTMLParagraphElement>) => {
    handleKeyDown(e.currentTarget.innerText);
  };

  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Å"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
  ].map((row, i) => {
    const elementRow = row.map((key, y) => {
      const correctOrAlmostOrNone = correctChars[key] ? "correct" : almostChars[key] ? "almost" : "none"
      const animationStyle = correctOrAlmostOrNone === "correct"
        ? "to-green"
        : correctOrAlmostOrNone === "almost"
        ? "to-orange"
        : null;
      const style = {
        animation: animationStyle
          ? `0.5s ${animationStyle} 2.5s ease-in both`
          : "none",
      };
      return (
        <div
          key={y}
          style={style}
          // className={`m-[2px] grid h-8 w-6 min-w-fit cursor-pointer select-none place-items-center rounded-md border-[1px] border-white border-opacity-30 p-1 active:bg-neutral-600 bg-opacity-60 ${correctChars.includes(key) ? "bg-green-500" : almostChars.includes(key) ? "bg-orange-400" : "bg-neutral-700"}`}
          className={`flex h-8 min-w-[1.6rem] lg:min-w-[2rem] max-w-fit cursor-pointer select-none place-items-center rounded-md border-[1px] border-white border-opacity-30 bg-opacity-60 active:bg-neutral-600 ${
            correctOrAlmostOrNone === "correct"
              ? "bg-green-500"
              : correctOrAlmostOrNone === "almost"
              ? "bg-orange-400"
              : "bg-neutral-700"
          }`}
        >
          <p onClick={handleKeyPress} className="font-semibold m-auto text-white">
            {key}
          </p>
        </div>
      );
    });

    return (
      <div key={i} className="flex justify-center gap-1">
        {elementRow}
      </div>
    );
  });

  return (
    <div className={`grid p-1 place-items-center gap-1 w-max ${className}`}>{rows}</div>
  );
};

export default Keyboard;
