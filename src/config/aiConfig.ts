import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const groq = createGroq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export const google = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
