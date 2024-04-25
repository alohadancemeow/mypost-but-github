import { useMemo } from "react";

export const useParseContent = (body: string) => {
  // make a new parser
  const parser = new DOMParser();
  if (!body) return null;
  const document = parser.parseFromString(body, "text/html");

  const postBody = document?.body?.firstChild?.textContent;

  return useMemo(() => postBody, [body]);
};
