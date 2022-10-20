import clsx from "clsx";

interface ToggleButtonProps {
  children: string;
  isActive: boolean;
  onClick: VoidFunction;
}

function ToggleButton({ children, isActive, onClick }: ToggleButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-xl border-2 border-black",
        isActive && "bg-black text-white"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ToggleButton;
