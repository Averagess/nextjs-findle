import translations from "@/lib/translations";
import CloseButton from "./CloseButton";
import GuessContainer from "./GuessContainer";

interface Props {
  toggleTutorial: () => void;
  locale: "fi" | "en";
}

const TutorialModal = ({ toggleTutorial, locale }: Props) => {
  return (
    <div
      className={`
      container relative h-[80vh]
      animate-rise place-self-center overflow-y-auto rounded-xl
      bg-white p-10 text-black dark:bg-neutral-800
      dark:text-white`}
    >
      <h1 className="text-2xl font-bold md:text-4xl">{translations.tutorialHeader[locale]}</h1>
      <CloseButton
        className="absolute right-0 top-0 mt-2 mr-2"
        onClick={toggleTutorial}
      />
      <ul className="m-4 list-disc text-sm md:text-lg">
        <li>
          {translations.tutorialFirstParagraph[locale]}
        </li>
        <li>
          {translations.tutorialSecondParagraph[locale]}
        </li>
      </ul>
      <h2 className="text-2xl font-bold md:text-4xl">{translations.tutorialExamples[locale]}</h2>
      <div className="m-4 text-sm md:text-lg">
        <GuessContainer chars="KISSA" correctWord="CBCDE" animate={false} />
        <p>
          {translations.tutorialExamplesWrong[locale]}
        </p>
        <GuessContainer chars="LAUTA" correctWord="PLOLL" animate={false} />
        <p>
          {translations.tutorialExamplesAlmost[locale]}
        </p>
        <GuessContainer chars="TERÄS" correctWord="TPOLD" animate={false} />
        <p>
          {translations.tutorialExamplesCorrect[locale]}
        </p>
        <GuessContainer chars="AAMUN" correctWord="AAMUN" animate={false} />
        <p>{translations.tutorialExamplesCorrectWord[locale]}</p>
      </div>
    </div>
  );
};

export default TutorialModal;
