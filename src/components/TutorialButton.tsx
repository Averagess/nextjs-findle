import translations from "@/lib/translations";

interface Props {
  onClick: () => void;
  locale: "fi" | "en";
}

const TutorialButton = ({ onClick, locale }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`
        grid
        h-10 w-10 select-none
        place-items-center
        rounded-full border-2 border-white dark:border-black
      bg-gray-800 bg-opacity-25
        text-3xl text-white hover:cursor-pointer
      dark:bg-gray-500 dark:bg-opacity-25 dark:text-black `}
      title={translations.tutorialTooltip[locale]}
    >
      <p>?</p>
    </div>
  );
};
export default TutorialButton;
