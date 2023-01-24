import classNames from "classnames";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  name: string;
  value: string;
  label?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon: () => JSX.Element;
}

export const InputWithIcon = ({
  name,
  value,
  label,
  onChange,
  className,
  icon: Icon,
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
      <div
        className={classNames(
          "flex gap-5 items-center border-2 text-lg rounded-sm w-full p-2 border-gray-300 placeholder-gray-400 ",
          className
        )}
      >
        <Icon />
        <input
          id={name}
          required={false}
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value, e)}
          className="focus:border-none border-none w-full outline-none"
          {...rest}
        />
      </div>
    </div>
  );
};
