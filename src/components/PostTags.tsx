import classNames from "classnames";

interface PostTagsProps {
  tags: string[];
  className?: string;
}

export const PostTags = ({ tags, className }: PostTagsProps) => {
  return (
    <>
      {tags.map((tag, index) => {
        const bgTag =
          tag === "js"
            ? "bg-yellow-200"
            : tag === "react"
            ? "bg-blue-100"
            : tag === "node"
            ? "bg-green-200"
            : tag === "frontend"
            ? "bg-fuchsia-100"
            : tag === "backend"
            ? "bg-lime-100"
            : "bg-gray-200";

        return (
          <span
            key={index}
            className={classNames(
              "inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
              bgTag,
              className
            )}
          >
            #{tag}
          </span>
        );
      })}
    </>
  );
};
