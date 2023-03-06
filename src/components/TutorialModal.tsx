import CloseButton from "./CloseButton";
import GuessContainer from "./GuessContainer";


interface Props {
  toggleTutorial: () => void;
  className?: string;
}

const TutorialModal = ({ toggleTutorial, className }: Props) => {
  return (
    <div className={`
      container animate-rise relative
      place-self-center bg-white dark:bg-neutral-800 dark:text-white
      p-10 rounded-xl h-[80vh] text-black
      overflow-y-auto`}>
      <h1 className="text-2xl md:text-4xl font-bold">Kuinka peli toimii?</h1>
      <CloseButton className="absolute right-0 top-0 mt-2 mr-2" onClick={toggleTutorial} />
      <ul className="list-disc m-4 text-sm md:text-lg">
        <li>Jokainen sana täytyy olla oikea 5-kirjainta pitkä Suomalainen sana</li>
        <li>Arvauksen jälkeen, peli näyttää arvauksen, ja näyttää väreillä miten oikeassa arvauksesi oli.</li>
      </ul>
      <h2 className="text-2xl md:text-4xl font-bold">Esimerkkejä</h2>
      <div className="text-sm md:text-lg m-4">
        <GuessContainer chars="KISSA" correctWord="CBCDE" animate={false} />
        <p>Tässä arvauksessa ei ollut yhtäkään oikeinta kirjainta. Peli kertoo jos kirjainta ei ole sanassa, jos sana jää harmaaksi arvauksen jälkeen.</p>
        <GuessContainer chars="LAUTA" correctWord="PLOLL" animate={false} />
        <p>Tässä arvauksessa on yksi oikea kirjain, mutta se ei ole oikeassa paikassa. Peli kertoo sen oranssilla värillä.</p>
        <GuessContainer chars="TERÄS" correctWord="TPOLD" animate={false} />
        <p>Tässä arvauksessa T on sanassa ja oikeassa paikassa. Peli kertoo sen vihreällä värillä.</p>
        <GuessContainer chars="AAMUN" correctWord="AAMUN" animate={false} />
        <p>Tämä arvaus oli täysin oikein</p>
      </div>
    </div>
  );
};

export default TutorialModal;