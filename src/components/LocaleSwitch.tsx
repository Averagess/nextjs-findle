import translations from "@/lib/translations";
import { useRouter } from "next/router";

const LocaleSwitch = ({ locale }: { locale: "fi" | "en" }) => {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(router.pathname, router.pathname, { locale: e.target.value });
  };
  return (
    <select
      className="
          h-10 rounded-lg border-2 border-white
          bg-gray-800 bg-opacity-25 px-2
          text-white dark:border-black dark:bg-gray-500
          dark:bg-opacity-25 dark:text-black "
      title={translations.localeSwitchTitle.en}
      onChange={handleChange}
      value={locale}
    >
      <option
        className="bg-gray-600 bg-opacity-25 text-black dark:bg-gray-500 dark:text-white"
        value="fi"
      >
        Finnish
      </option>
      <option
        className="bg-gray-600 bg-opacity-25 text-black dark:bg-gray-500 dark:text-white"
        value="en"
      >
        English
      </option>
    </select>
  );
};

export default LocaleSwitch;
