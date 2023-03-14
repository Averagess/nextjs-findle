interface Props {
  children: React.ReactNode;
  toggleBG: () => void;
  className?: string;
}

const BackgroundBlur = ({ children, toggleBG, className }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      toggleBG();
    }
  };

  return (
    <div className={`${className}`}>
      <div
        onClick={handleClick}
        className="absolute inset-0 grid animate-bg-blur bg-black bg-opacity-60"
      >
        {children}
      </div>
    </div>
  );
};
export default BackgroundBlur;
