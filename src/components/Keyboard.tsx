import KeyboardRow from "./KeyboardRow";

interface Props {
  handleKeyDown: (keyPressed: string) => void;
  guesses: string[];
  correctWord: string;
  gameOver: boolean;
  className?: string;
}

const Keyboard = ({
  handleKeyDown,
  guesses,
  correctWord,
  className,
  gameOver,
}: Props) => {
  const correctChars: { [key: string]: string } = {};
  const almostChars: { [key: string]: string } = {};
  const incorrectChars: { [key: string]: string } = {};

  guesses.forEach((guess) => {
    guess.split("").forEach((char, i) => {
      if (char === correctWord[i]) {
        correctChars[char] = char;
      } else if (correctWord.includes(char)) {
        almostChars[char] = char;
      } else {
        incorrectChars[char] = char;
      }
    });
  });

  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Å"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
  ];

  return (
    <div className={`flex w-full flex-col gap-1 p-1 ${className}`}>
      {rows.map((row, i) => (
        <KeyboardRow
          key={i}
          chars={row}
          onClick={(char) => handleKeyDown(char)}
          correctChars={correctChars}
          almostChars={almostChars}
          incorrectChars={incorrectChars}
          gameOver={gameOver}
        />
      ))}
    </div>
  );
};

export default Keyboard;
