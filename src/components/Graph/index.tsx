import { useEffect } from "react";

import { groq } from "@/config/aiConfig";
import { generateText } from "ai";

export const Graph = ({
  //bookText,
}: {
  //bookText: ReadableStream<Uint8Array>;
}) => {
  //console.log({ bookText });
  const callAi = async () => {
    const { text } = await generateText({
      model: groq("gemma2-9b-it"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });

    console.log({ text });
  };
  useEffect(() => {
    callAi();
  }, []);
  return <>Book Text</>;
};
