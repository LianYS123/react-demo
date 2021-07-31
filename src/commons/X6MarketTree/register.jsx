import React from 'react';
import { Graph } from "@antv/x6";
import { MarketNode } from "./components/ReactNode";
import { EditableCellTool } from "./components/EditableCellTool";

Graph.registerEdgeTool("editableCell", EditableCellTool, true);
// Graph.registerNodeTool("editableCell", EditableCellTool, true);

let mouted = false;

export const register = (opts) => {
  if (mouted) {
    return;
  }
  mouted = true;
  // 注册 React 组件
  Graph.registerReactComponent("market-node", (node) => (
    <MarketNode node={node} {...opts} />
  ));

  // 自定义边
  Graph.registerEdge(
    "org-edge",
    {
      zIndex: -1,
      attrs: {
        line: {
          fill: "none",
          strokeLinejoin: "round",
          strokeWidth: "1.5",
          stroke: "#a0a0a0",
          sourceMarker: null,
        },
      },
    },
    true
  );
};
