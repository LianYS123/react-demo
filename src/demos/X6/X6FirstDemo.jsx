import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Graph } from "@antv/x6";
// 使用 CDN 引入时暴露了 X6 全局变量
// const { Graph } = X6

const data = {
  // 节点
  nodes: [
    {
      id: "node1", // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "hello", // String，节点标签
    },
    {
      id: "node2", // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "world", // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: "node1", // String，必须，起始节点 id
      target: "node2", // String，必须，目标节点 id
    },
  ],
};

const useGraph = ({ data, containerRef, config }) => {
  const [graph, setGraph] = useState(null);
  const renderedRef = useRef(false); // 是否已生成图

  //初始化树
  useEffect(() => {
    const container = ReactDOM.findDOMNode(containerRef.current);
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    // const defaultConfig = getDefaultConfig({ width, height });
    if (!renderedRef.current) {
      const graph = new Graph({
        container: container,
        width,
        height,
        background: {
          color: "#fffbe6", //画布背景色
        },
        grid: {
          size: 10, //网格大小
          visible: true, //渲染背景
        },
      });
      graph.fromJSON(data);
      if (graph) {
        // 不会重复生成图
        renderedRef.current = true; // 标记图已生成
        setGraph(graph);
        // resize
        // const resize = () => {
        //   if (!graph || graph.get("destroyed")) return;
        //   if (!container || !container.scrollWidth || !container.scrollHeight)
        //     return;
        //   graph.changeSize(container.scrollWidth, container.scrollHeight);
        // };

        // window.addEventListener("resize", resize);

        // return () => {
        //   window.removeEventListener("resize", resize);
        // };
      }
    }
  }, [data, containerRef, config]);

  return { graph };
};

export const X6FirstDemo = (props) => {
  const ref = useRef(null);
  const { graph } = useGraph({ data, containerRef: ref });
  return <div ref={ref} className="container" id="x6-tree-container"></div>;
};
