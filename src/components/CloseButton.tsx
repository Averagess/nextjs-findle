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
        rounded-md border-2 border-white
        cursor-pointer
        active:scale-95 active:bg-neutral-800
        select-none
        text-xl
        bg-neutral-900 bg-opacity-50
        ${className}
      `}
    >
      <p>&#10006;</p>
    </div>
  );
};

export default CloseButton;
