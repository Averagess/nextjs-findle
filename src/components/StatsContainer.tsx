import { PlayerData } from "@/pages";

interface Props {
  playerData: PlayerData | null;
  className?: string;
}

const StatsContainer = ({ playerData, className }: Props) => {
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
  }

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
  }

  const totalGames = playerData?.games ? Object.keys(playerData.games).length : 0;

  return (
    <div className="w-full">
      <h1 className="font-semibold">TILASTOJA</h1>
      <div className="flex flex-wrap justify-around md:justify-start md:flex-nowrap gap-10 whitespace-nowrap">
        <div className="flex w-fit flex-col items-center">
          <p className="text-4xl font-bold">{totalGames}</p>
          <p className="text-sm">Pelattu</p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <p className="text-4xl font-bold">{winPercentage()}</p>
          <p className="text-sm">Voitto %</p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <p className="text-4xl font-bold">{currentStreak()}</p>
          <p className="text-sm">Voittoputki</p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <p className="text-4xl font-bold">{longestStreak()}</p>
          <p className="text-sm">Pisin voittoputki</p>
        </div>
      </div>
    </div>
  );
};

export default StatsContainer;
