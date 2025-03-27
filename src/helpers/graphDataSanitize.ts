import { z } from "zod";
import { graphAiSchema } from "@/services/aiServices";

type GraphData = z.infer<typeof graphAiSchema>;

export const calculateCharacterImportance = (graphData: GraphData) => {
  // Compute raw importance counts for all nodes.
  const rawImportance = Object.fromEntries(
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

    if (rawImportance.hasOwnProperty(sourceId)) {
      rawImportance[sourceId]++;
    }
    if (rawImportance.hasOwnProperty(targetId)) {
      rawImportance[targetId]++;
    }
  });

  // Create a new object for normalized importance.
  const normalizedImportance: Record<string, number> = {};
  const counts = Object.values(rawImportance);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  if (min === max) {
    // If all nodes have the same raw importance, assign the midpoint value (12.5).
    for (const key in rawImportance) {
      normalizedImportance[key] = 12.5;
    }
  } else {
    for (const key in rawImportance) {
      const value = rawImportance[key];
      // Linear normalization: map raw value to range [5, 20]
      normalizedImportance[key] = 5 + ((value - min) * 15) / (max - min);
    }
  }

  return normalizedImportance;
};
