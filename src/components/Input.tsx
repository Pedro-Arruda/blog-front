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
  ...rest
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-md font-medium text-gray-600 mb-1.5"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={false}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        className={classNames(
          "border-2 text-lg rounded-sm w-full p-2 border-gray-300 placeholder-gray-400",
          className
        )}
        {...rest}
      />
    </div>
  );
};
