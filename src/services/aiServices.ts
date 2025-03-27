import { generateObject } from "ai";
import { z } from "zod";

import { groq } from "@/config/aiConfig";
import { asyncWrapper } from "@/utils/asyncWrapper";

export const createGraphData = async (bookText: string) => {
  return asyncWrapper(async () => {
    const res = await generateObject({
      model: groq("gemma2-9b-it"),
      schema: z
        .object({
          nodes: z.array(z.object({ id: z.string() })),
          links: z.array(
            z.object({
              source: z.string(),
              target: z.string(),
              relation: z.string(),
            })
          ),
        })
        .superRefine((data, ctx) => {
          const nodeIds = new Set(data.nodes.map((node) => node.id));

          data.links.forEach((link, index) => {
            if (!nodeIds.has(link.source)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Link at index ${index} has unknown source: ${link.source}`,
                path: ["links", index, "source"],
              });
            }

            if (!nodeIds.has(link.target)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Link at index ${index} has unknown target: ${link.target}`,
                path: ["links", index, "target"],
              });
            }
          });
        }),

      system:
        "You will receive as prompt the text of a book, extract the characters and the relation between them",
      prompt: bookText,
    });

    return { bokGraphData: res.object };
  });
};
