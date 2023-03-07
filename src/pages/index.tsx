import { NextPageContext } from "next";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

import GuessContainer from "@/components/GuessContainer";
import Keyboard from "@/components/Keyboard";
import Layout from "@/components/Layout";
import Navbar from "@/components/NavBar";
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
  const randomWord = keys[Math.floor(Math.random() * keys.length)];
  console.log("Locale in getServerSideProps: ", context.locale);

  return {
    props: {
      word: randomWord,
      words,
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
}

const addNoti = (text: string, type: "default" | "error") => {
  toast(text, {
    type,
  });
};

export default function Home({
  word,
  words,
  locale,
}: {
  word: string;
  words: { [key: string]: string };
  locale: "fi" | "en";
}) {
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
      setPlayerData(JSON.parse(playerData));
    } else setPlayerData({ games: {} });
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
        <Navbar toggleTutorial={() => setTutorial(!tutorial)} locale={locale} />
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
            theme={theme === "dark" ? "dark" : "light"}
          />
        )}
        <main
          className="grid h-screen w-screen bg-[#f0f0f0] dark:bg-neutral-800"
          onKeyDown={(e) => handleKeyDown(e.key)}
          tabIndex={0}
        >
          <div
            className={`
            flex h-full w-[99vw] flex-col items-center place-self-center
            rounded-xl bg-[#cecece]
            pt-8 shadow-neumorphism
            dark:bg-neutral-800 dark:shadow-neumorphism-dark
            sm:h-max sm:w-[60vw] sm:pt-0 md:w-[50vw] lg:w-[40vw]`}
          >
            <h1 className="text-white">{word}</h1>
            <h2 className="text-white">{gameOver ? "true" : "false"}</h2>
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
            {gameOver && (
              <button
                onClick={() => setShowEnding(!showEnding)}
                className={`
                  mt-5 rounded-md
                  border-2 border-black
                bg-blue-700 p-2 text-white
                hover:bg-blue-600
                  active:bg-blue-700 active:ring-2
              `}
              >
                {translations.showResultsButton[locale]}
              </button>
            )}
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
              />
            </BackgroundBlur>
          )}
        </main>
      </Layout>
    </>
  );
}
