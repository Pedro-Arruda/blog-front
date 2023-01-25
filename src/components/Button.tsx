import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={classNames(
        className,
        "text-white bg-neutral-800  font-medium rounded-3xl text-md px-16 py-2.5 text-center"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
