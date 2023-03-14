import translations from "@/lib/translations";
import { useEffect, useState } from "react";

interface Props {
  nextWordDateMS: number;
  locale: "fi" | "en";
}

const ReleaseTimer = ({ nextWordDateMS, locale }: Props) => {
  const [timeLeft, setTimeLeft] = useState(nextWordDateMS - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(nextWordDateMS - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  });

  const timeString = new Date(timeLeft).toISOString().slice(11, 19);

  return (
    <div>
      <h3 className="text-xl">{translations.nextWordRelease[locale]}</h3>
      <p className="text-xl text-gray-600 dark:text-gray-300">{timeString}</p>
    </div>
  );
};

export default ReleaseTimer;
