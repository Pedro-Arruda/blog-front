import { decode } from "html-entities";

export const makePostResume = (
  content: string,
  numOfCharacters: number | undefined = 150
) => {
  const str = content.replace(/<[^>]+>/g, "");

  return decode(str)
    .slice(0, numOfCharacters)
    .replace(/^(.*) [^ ]*$/, "$1");
};
