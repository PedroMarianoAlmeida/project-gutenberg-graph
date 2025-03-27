import ForceGraph2D, { NodeObject } from "react-force-graph-2d";
import { z } from "zod";

//import mockedData from "@/graphDataExample.json";
import { graphAiSchema } from "@/services/aiServices";


type CustomNode = NodeObject & {
  id: string;
  x: number;
  y: number;
  __bckgDimensions?: [number, number];
};
type GraphData = z.infer<typeof graphAiSchema>;

export const Result = ({ graphData }: { graphData: GraphData }) => {
  return (
    <div className="flex justify-center items-center">
      <ForceGraph2D
        graphData={graphData}
        enablePanInteraction={false}
        linkColor={() => "#00BFFF"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const customNode = node as CustomNode;
          const label = customNode.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions: [number, number] = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.2
          ) as [number, number];

          ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
          ctx.fillRect(
            customNode.x - bckgDimensions[0] / 2,
            customNode.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(label, customNode.x, customNode.y);

          customNode.__bckgDimensions = bckgDimensions;
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          const customNode = node as CustomNode;
          const bckgDimensions = customNode.__bckgDimensions;
          if (bckgDimensions) {
            ctx.fillStyle = color;
            ctx.fillRect(
              customNode.x - bckgDimensions[0] / 2,
              customNode.y - bckgDimensions[1] / 2,
              ...bckgDimensions
            );
          }
        }}
      />
    </div>
  );
};
