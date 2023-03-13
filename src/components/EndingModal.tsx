import translations from "@/lib/translations";
import { PlayerData } from "@/pages/index";
import { useState } from "react";
import CloseButton from "./CloseButton";
import ReleaseTimer from "./ReleaseTimer";
import StatsContainer from "./StatsContainer";

interface Props {
  toggleEnding: () => void;
  guesses: string[];
  correctWord: string;
  playerData: PlayerData | null;
  locale: "fi" | "en";
  nextWordDateMS: number;
}

const EndingModal = ({
  toggleEnding,
  playerData,
  guesses,
  correctWord,
  locale,
  nextWordDateMS,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const guessedRight = guesses[guesses.length - 1] === correctWord;
  const Header = guessedRight
    ? translations.endingCorrectHeader[locale]
    : translations.endingWrongHeader[locale];
  const Subheader = `${translations.endingSubHeader[locale]} ${correctWord}.`;

  const boardToClipboard = () => {
    const board = guesses;
    const lines = board.map((guess) => {
      const toEmojis = guess.split("").map((letter, i) => {
        if (letter === correctWord[i]) {
          return "🟩";
        } else if (correctWord.includes(letter)) {
          return "🟨";
        } else return "⬛";
      });

      return `${toEmojis.join("")}\n`;
    });

    lines.unshift(new Date().toLocaleDateString() + "\n");
    lines.unshift("Findle \n");
    navigator.clipboard.writeText(lines.join(""));
    setCopied(true);
  };

  const safe = playerData?.games ?? {};
  const guessKeys = Object.keys(safe);
  const latestGuess = guessKeys[guessKeys.length - 1];
  const solvedDate = new Date(Number(latestGuess));
  const releaseDate = new Date(nextWordDateMS);

  const releaseMS = releaseDate.getTime();
  const solvedMS = solvedDate.getTime();
  const hourDiff = (releaseMS - solvedMS) / 1000 / 60 / 60;
  const bool =
    hourDiff < 24

  return (
    <div
      className="
        relative grid
        w-screen h-[80vh] animate-rise place-self-center
        rounded-xl bg-white p-10
        text-black dark:bg-neutral-800 dark:text-white
        md:w-[75vw] lg:w-[50vw] xl:w-[35vw]
        overflow-y-auto
        "
    >
      <CloseButton
        onClick={toggleEnding}
        className="absolute right-0 top-0 m-5"
      />
      <div className="flex w-5/6 flex-col ">
        {bool && (
          <>
            <h1
              className={`
            text-2xl font-semibold 
            ${guessedRight ? "text-green-500" : "text-gray-500"}
            `}
            >
              {Header}
            </h1>
            <h2 className="whitespace-nowrap text-2xl">{Subheader}</h2>
            <ReleaseTimer nextWordDateMS={nextWordDateMS} locale={locale} />
          </>
        )}
        <div className="mt-5 flex w-full flex-col">
          <StatsContainer locale={locale} playerData={playerData} />
          {bool &&
            (copied ? (
              <button
                className="
            h-15 mt-5 w-40
            self-center rounded-xl border-2
            bg-green-500
            p-2
            "
              >
                {translations.copiedToClipboard[locale]}
              </button>
            ) : (
              <button
                onClick={boardToClipboard}
                className="
              h-15 mt-5 w-40
              self-center rounded-xl border-2
              bg-sky-500 p-2 hover:bg-sky-400 active:bg-sky-500
              active:ring-2
              "
              >
                {translations.share[locale]}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EndingModal;
