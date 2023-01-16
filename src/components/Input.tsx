import classNames from "classnames";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  name: string;
  value: string;
  label?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = ({
  name,
  value,
  label,
  onChange,
  className,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xl font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        className={classNames(
          "border text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ",
          className
        )}
      />
    </div>
  );
};
