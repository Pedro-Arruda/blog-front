import classNames from "classnames";

interface BadgeProps {
  content: string;
  bgColor?: string;
}

export const Badge = ({ content, bgColor }: BadgeProps) => {
  return (
    <p
      className={classNames(
        bgColor,
        "rounded-2xl py-1.5 px-4 text-white text-xs mx-2"
      )}
    >
      {content}
    </p>
  );
};
