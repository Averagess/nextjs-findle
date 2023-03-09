interface Props {
  onClick: () => void;
  className?: string;
}

const CloseButton = ({ onClick, className }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`
        grid h-12 w-12
        place-items-center
        rounded-md
        cursor-pointer
        active:scale-95 active:bg-neutral-800
        hover:scale-110
        transition-all duration-200 ease-in-out
        select-none
        text-xl
        bg-neutral-700 bg-opacity-30
        ${className}
      `}
    >
      <p>&#10006;</p>
    </div>
  );
};

export default CloseButton;
