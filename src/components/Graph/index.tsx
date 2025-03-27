import { useQuery } from "@tanstack/react-query";
import { createGraphData } from "@/services/aiServices";

export const Graph = ({ bookText }: { bookText: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["createGraphData", bookText.match(/Title:\s*(.{0,100})/)],
    queryFn: async () => {
      const graphData = await createGraphData(bookText);
      if (!graphData.success) {
        throw new Error(graphData.message);
      }
      const {
        result: {
          bokGraphData: { links, nodes },
        },
      } = graphData;
      return { links, nodes };
    },
  });

  console.log({ data, error, isLoading });

  return (
    <>
      {isLoading && <p>Creating graph data...</p>}
      {error && <p className="text-destructive">Error creating graph</p>}
    </>
  );
};
