import { asyncWrapper } from "@/utils/asyncWrapper";
import { streamToString } from "@/utils/streamToString";

const corsUrl = "https://cors-anywhere.herokuapp.com/"; // Check if I can create a server or a NextJs project to avoid
const gutenbergUrl = "https://www.gutenberg.org/";

export const getBookText = async (bookId: number) => {
  return asyncWrapper(async () => {
    const res = await fetch(
      `${corsUrl}${gutenbergUrl}files/${bookId}/${bookId}-0.txt`
    );
    if (res.status === 404) throw new Error("Book not found");
    if (!res.ok) throw new Error("Error fetching book");
    if (res.body === null) throw new Error("Book has no content");

    const bookText = await streamToString(res.body);
    return bookText;
  });
};
