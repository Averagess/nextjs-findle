interface Props {
  children: React.ReactNode;
  toggleBG: () => void;
  className?: string;
}

const BackgroundBlur = ({ children, toggleBG, className }: Props) => {

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.target, e.currentTarget)
    if (e.target === e.currentTarget) {
      toggleBG();
    }
  };

  return (
    <div className={`${className}`}>
      <div onClick={handleClick} className="grid animate-bg-blur absolute inset-0 bg-black bg-opacity-60">
        {children}
      </div>
    </div>
  );
};
export default BackgroundBlur;
