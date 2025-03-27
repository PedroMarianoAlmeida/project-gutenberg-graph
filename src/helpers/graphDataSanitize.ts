import { z } from "zod";

import { graphAiSchema } from "@/services/aiServices";

type GraphData = z.infer<typeof graphAiSchema>;
export const calculateCharacterImportance = (graphData: GraphData) => {
  const characterImportance = Object.fromEntries(
    graphData.nodes.map((node) => [node.id, 0])
  );

  graphData.links.forEach((link) => {
    const sourceCandidate = link.source as unknown;
    const targetCandidate = link.target as unknown;

    const sourceId =
      typeof sourceCandidate === "object" &&
      sourceCandidate !== null &&
      "id" in sourceCandidate
        ? (sourceCandidate as { id: string }).id
        : link.source;
    const targetId =
      typeof targetCandidate === "object" &&
      targetCandidate !== null &&
      "id" in targetCandidate
        ? (targetCandidate as { id: string }).id
        : link.target;

    if (characterImportance.hasOwnProperty(sourceId)) {
      characterImportance[sourceId]++;
    }
    if (characterImportance.hasOwnProperty(targetId)) {
      characterImportance[targetId]++;
    }
  });

  return characterImportance;
};
