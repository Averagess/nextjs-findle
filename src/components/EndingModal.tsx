import { PlayerData } from "@/pages/index";
import CloseButton from "./CloseButton";
import StatsContainer from "./StatsContainer";

interface Props {
  toggleEnding: () => void;
  className?: string;
  guesses: string[];
  correctWord: string;
  playerData: PlayerData | null;
}

const EndingModal = ({
  toggleEnding,
  playerData,
  className,
  guesses,
  correctWord,
}: Props) => {
  const guessedRight = guesses[guesses.length - 1] === correctWord;
  // const Header = guessedRight
  //   ? `Oikein! Päivän sana oli ${correctWord}`
  //   : `Parempi onni ensi kerralla. Päivän sana oli ${correctWord}`;
  const Header = guessedRight ? "Oikein!" : "Väärin.";
  const Subheader = `Päivän sana oli ${correctWord}`;

  const boardToClipboard = () => {
    const board = guesses;
    const lines = board.map((guess) => {
      const toEmotes = guess.split("").map((letter, i) => {
        if (letter === correctWord[i]) {
          return "🟩";
        } else if (correctWord.includes(letter)) {
          return "🟨";
        } else return "⬛";
      });

      return `${toEmotes.join("")}\n`;
    });

    lines.unshift(new Date().toLocaleString() + "\n");
    lines.unshift("Findle \n");
    navigator.clipboard.writeText(lines.join(""));
  };

  return (
    <div
      className={`container relative grid animate-rise place-self-center rounded-xl bg-neutral-800 p-10 text-white`}
    >
      <CloseButton
        onClick={toggleEnding}
        className="absolute right-0 top-0 m-5"
      />
      <div className="flex w-1/2 flex-col place-self-center self-center">
        <h1
          className={`font-semibold text-2xl ${
            guessedRight ? "text-green-500" : "text-gray-500"
          }`}
        >
          {Header}
        </h1>
        <h2 className="max-w-[75%] text-2xl">{Subheader}</h2>
        <div className="mt-5 flex w-fit flex-col">
          <StatsContainer playerData={playerData} />
          <button
            onClick={boardToClipboard}
            className={`
          h-15 mt-5 w-40
          self-center rounded-xl border-2
          bg-sky-500
          p-2
          hover:bg-sky-400
          active:bg-sky-500 active:ring-2`}
          >
            Jaa kaverille
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndingModal;
