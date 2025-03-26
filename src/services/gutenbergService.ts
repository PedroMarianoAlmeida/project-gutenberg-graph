import { asyncWrapper } from "@/utils/asyncWrapper";

export const getBookText = async (bookId: number) => {
  return asyncWrapper(
    async () =>
      await fetch(`https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`)
  );
};
