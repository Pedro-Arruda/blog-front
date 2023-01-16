import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={classNames(
        "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center",
        className
      )}
    >
      {children}
    </button>
  );
};
