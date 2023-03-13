import { NextPageContext } from "next";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GuessContainer, Keyboard, Layout, Navbar } from "@/components";
import translations from "@/lib/translations";
import words from "@/lib/words";

const TutorialModal = dynamic(() => import("../components/TutorialModal"), {});
const EndingModal = dynamic(() => import("../components/EndingModal"), {});
const BackgroundBlur = dynamic(
  () => import("../components/BackgroundBlur"),
  {}
);

export const getServerSideProps = (context: NextPageContext) => {
  const keys = Object.keys(words);
  const currYear = new Date().getFullYear();
  const newYearsEve = new Date(currYear, 0, 1);

  const currDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Helsinki" })
  );

  const timeDiff = currDate.getTime() - newYearsEve.getTime();
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const randomWord = keys[diffDays];
  console.log("Locale in getServerSideProps: ", context.locale);

  const nextWordDate = new Date(
    Date.UTC(
      currDate.getFullYear(),
      currDate.getMonth(),
      currDate.getDate(),
      22,
      0,
      0,
      0
    )
  );
  const nextWordDateMS = nextWordDate.getTime();

  console.log("nextWordDate in getServerSideProps: ", nextWordDate);
  console.log("nextWordDateMS in getServerSideProps: ", nextWordDateMS);

  return {
    props: {
      word: randomWord,
      words,
      nextWordDateMS,
      locale: context.locale,
    },
  };
};

export interface PlayerData {
  games: {
    [key: number]: {
      word: string;
      guesses: string[];
    };
  };
  tutorialSeen: boolean;
}

const addNoti = (text: string, type: "default" | "error") => {
  toast(text, {
    type,
  });
};

interface Props {
  word: string;
  words: { [key: string]: string };
  locale: "fi" | "en";
  nextWordDateMS: number;
}

export default function Home({ word, words, locale, nextWordDateMS }: Props) {
  const [guess, setGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [tutorial, setTutorial] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shouldShakeInput, setShouldShakeInput] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    setMounted(true);
    const playerData = localStorage.getItem("playerData");
    if (playerData) {
      const parsedData: PlayerData = JSON.parse(playerData);
      setPlayerData(parsedData);
      if (!parsedData.tutorialSeen) {
        setTutorial(true);
        setPlayerData({ ...parsedData, tutorialSeen: true });
        return;
      } else if (Object.keys(parsedData.games).length === 0) return;

      const gameKeys = Object.keys(parsedData.games);
      const latestGame = gameKeys[gameKeys.length - 1];

      const solvedDate = new Date(Number(latestGame));
      const releaseDate = new Date(nextWordDateMS);

      const solvedMS = solvedDate.getTime();
      const releaseMS = releaseDate.getTime();

      const hourDiff = (releaseMS - solvedMS) / 1000 / 60 / 60;

      console.log("hours between latest solved and release", hourDiff);

      console.log("solvedDate", solvedDate);
      console.log("releaseDate", releaseDate);

      if (hourDiff < 24 && parsedData.games[Number(latestGame)].word === word) {
        setGuesses(parsedData.games[Number(latestGame)].guesses);
        setGameOver(true);
      }
    } else {
      setTutorial(true);
      setPlayerData({ games: {}, tutorialSeen: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Player data: ", playerData);
    if (playerData) {
      localStorage.setItem("playerData", JSON.stringify(playerData));
    }
  }, [playerData]);

  const toggleShake = () => {
    setShouldShakeInput(true);
    setTimeout(() => setShouldShakeInput(false), 1100);
  };
  const handleKeyDown = (keyPressed: string) => {
    if (gameOver) return;
    const key = keyPressed.toUpperCase();

    console.log(key);
    if (key.length === 1 && guess.length < word.length) {
      setGuess((prev) => prev + key);
    } else if (key === "BACKSPACE" || key === "BACK") {
      setGuess((prev) => prev.slice(0, -1));
    } else if (key === "ENTER" || key === "RETURN") {
      if (guess.length === word.length) {
        if (!words[guess]) {
          toggleShake();
          return addNoti(translations.wordNotFoundNoti[locale], "default");
        }

        setGuess("");
        setGuesses((prev) => [...prev, guess]);
      } else {
        toggleShake();
        addNoti("Sana on liian lyhyt", "default");
      }
    }
  };

  const PastGuesses = guesses.map((guess, i) => (
    <GuessContainer key={i} chars={guess} correctWord={word} animate={true} />
  ));

  const EmptyGuesses =
    guesses.length < 5
      ? Array.from({ length: 5 - guesses.length - 1 }, (_, i) => (
          <GuessContainer key={i} />
        ))
      : [];

  // Checking if the game should be over
  if (
    !gameOver &&
    (guesses.length === 5 || guesses[guesses.length - 1] === word)
  ) {
    console.log("game over");
    setGameOver(true);
    setTimeout(() => setShowEnding(true), 3000);

    // Saving the game data to local storage
    const playerData = localStorage.getItem("playerData");
    if (playerData) {
      const parsed: PlayerData = JSON.parse(playerData);
      const data = {
        games: {
          ...parsed.games,
          [Date.now()]: {
            word,
            guesses,
          },
        },
        tutorialSeen: parsed.tutorialSeen,
      };
      setPlayerData(data);
    }
  }

  return (
    <>
      <Head>
        <title>Findle</title>
        <meta name="description" content="Findle | Guess the Finnish word" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar
          toggleTutorial={() => setTutorial(!tutorial)}
          toggleStatistics={() => setShowEnding(!showEnding)}
          locale={locale}
        />
        {mounted && (
          <ToastContainer
            className="mt-16"
            position="top-center"
            autoClose={5000}
            limit={5}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            closeButton={false}
            style={{ textAlign: "center" }}
            theme={theme === "light" ? "light" : "dark"}
          />
        )}
        <main
          className="grid h-full w-full bg-white dark:bg-neutral-800"
          onKeyDown={(e) => handleKeyDown(e.key)}
          tabIndex={0}
        >
          <div
            className={`
            flex h-full w-full flex-col items-center place-self-center
            bg-gray-300 py-8
            dark:bg-neutral-800 sm:h-max
            sm:w-[60%] sm:rounded-xl
            sm:shadow-neumorphism sm:dark:shadow-neumorphism-dark md:w-[50%] lg:w-[40%]`}
          >
            <div>
              {PastGuesses}
              {guesses.length < 5 && (
                <GuessContainer shakeInput={shouldShakeInput} chars={guess} />
              )}
              {EmptyGuesses}
            </div>
            <Keyboard
              className="mt-5"
              handleKeyDown={handleKeyDown}
              guesses={guesses}
              correctWord={word}
              gameOver={gameOver}
            />
          </div>
          {tutorial && (
            <BackgroundBlur
              toggleBG={() => setTutorial(!tutorial)}
              className="fixed inset-0 z-10"
            >
              <TutorialModal
                locale={locale}
                toggleTutorial={() => setTutorial(!tutorial)}
              />
            </BackgroundBlur>
          )}
          {showEnding && (
            <BackgroundBlur
              className="fixed inset-0 z-10"
              toggleBG={() => setShowEnding(!showEnding)}
            >
              <EndingModal
                playerData={playerData}
                guesses={guesses}
                toggleEnding={() => setShowEnding(!showEnding)}
                correctWord={word}
                locale={locale}
                nextWordDateMS={nextWordDateMS}
              />
            </BackgroundBlur>
          )}
        </main>
      </Layout>
    </>
  );
}
