import classNames from "classnames";
import { Lock, LockOpen } from "phosphor-react";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  name: string;
  value: string;
  label?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const InputPassword = ({
  name,
  value,
  label,
  onChange,
  className,
  ...rest
}: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

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
        {isVisible ? (
          <LockOpen
            size={22}
            weight="fill"
            color="#44403c"
            onClick={() => setIsVisible(!isVisible)}
          />
        ) : (
          <Lock
            size={22}
            weight="fill"
            color="#44403c"
            onClick={() => setIsVisible(!isVisible)}
          />
        )}

        <input
          id={name}
          name={name}
          value={value}
          required={false}
          type={isVisible ? "text" : "password"}
          onChange={(e) => onChange && onChange(e.target.value, e)}
          className="focus:border-none border-none w-full outline-none"
          {...rest}
        />
      </div>
    </div>
  );
};
