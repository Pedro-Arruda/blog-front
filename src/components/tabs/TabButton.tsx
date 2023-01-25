import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface TabButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton = ({
  label,
  isActive,
  onClick,
  ...rest
}: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      title={`Visualizar ${label}`}
      className={classNames(
        "p-2 text-lg text-neutral-700",
        isActive && "border-b-2 border-neutral-900 z-10 font-semibold"
      )}
      {...rest}
    >
      {label}
    </button>
  );
};
