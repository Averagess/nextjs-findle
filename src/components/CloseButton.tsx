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
        cursor-pointer
        select-none
        place-items-center
        rounded-md bg-neutral-700
        bg-opacity-30
        text-xl transition-all duration-200
        ease-in-out
        hover:scale-110
        active:scale-95 active:bg-neutral-800
        ${className}
      `}
    >
      <p>&#10006;</p>
    </div>
  );
};

export default CloseButton;
