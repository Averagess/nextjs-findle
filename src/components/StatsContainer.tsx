import translations from "@/lib/translations";
import { PlayerData } from "@/pages";

interface Props {
  playerData: PlayerData | null;
  className?: string;
  locale: "fi" | "en";
}

const StatsContainer = ({ playerData, className, locale }: Props) => {
  const winPercentage = () => {
    if (playerData?.games) {
      const games = Object.values(playerData.games);
      const wins = games.filter(
        (game) => game.guesses[game.guesses.length - 1] === game.word
      ).length;
      return Math.round((wins / games.length) * 100);
    }
    return 0;
  };

  const currentStreak = () => {
    if (playerData?.games) {
      const games = Object.values(playerData.games);
      let streak = 0;
      for (let i = games.length - 1; i >= 0; i--) {
        const game = games[i];
        if (game.guesses[game.guesses.length - 1] === game.word) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    }
    return 0;
  };

  const longestStreak = () => {
    if (playerData?.games) {
      const games = Object.values(playerData.games);
      let streak = 0;
      let longestStreak = 0;
      for (let i = games.length - 1; i >= 0; i--) {
        const game = games[i];
        if (game.guesses[game.guesses.length - 1] === game.word) {
          streak++;
        } else {
          streak = 0;
        }
        if (streak > longestStreak) {
          longestStreak = streak;
        }
      }
      return longestStreak;
    }
    return 0;
  };

  const totalGames = playerData?.games
    ? Object.keys(playerData.games).length
    : 0;

  const calculateGuessDistributions = () => {
    const obj: { [key: string]: number } = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
    };
    if (playerData?.games) {
      const games = Object.values(playerData.games);
      games.forEach((game) => {
        if (game.word === game.guesses[game.guesses.length - 1]) {
          obj[game.guesses.length]++;
        }
      });
    }
    return obj;
  };

  const guessDistributions = calculateGuessDistributions();
  const maxValue = Math.max(...Object.values(guessDistributions));

  return (
    <div className="w-full">
      <hr className="my-5" />
      <h1 className="font-semibold">{translations.statistics[locale]}</h1>
      <div className="flex flex-wrap justify-around gap-10 whitespace-nowrap md:flex-nowrap md:justify-start">
        <div className="flex w-fit flex-col items-center">
          <p className="text-4xl font-bold">{totalGames}</p>
          <p className="text-sm">{translations.gamesPlayed[locale]}</p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <p className="text-4xl font-bold">{winPercentage()}</p>
          <p className="text-sm">{translations.winPercentage[locale]}</p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <p className="text-4xl font-bold">{currentStreak()}</p>
          <p className="text-sm">{translations.winStreak[locale]}</p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <p className="text-4xl font-bold">{longestStreak()}</p>
          <p className="text-sm">{translations.longestWinStreak[locale]}</p>
        </div>
      </div>
      <hr className="my-5" />
      <h2 className="font-semibold">GUESS DISTRIBUTION</h2>
      <div className="flex flex-col gap-2">
        {Object.keys(guessDistributions).map((key, index) => {
          return (
            <div className="flex" key={index}>
              <p className="h-6 w-6 text-center">{key}</p>
              <div
                style={{
                  width: `${(guessDistributions[key] / maxValue) * 95}%`,
                }}
                className="flex h-6 min-w-fit flex-row-reverse content-end bg-gray-300 px-2 text-black dark:bg-neutral-900 dark:text-white"
              >
                <p>{guessDistributions[key]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsContainer;
