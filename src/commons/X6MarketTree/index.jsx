import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Graph } from "@antv/x6";
import { register } from "./register";
import { getUtils } from "./utils";
import { getDefaultConfig } from "./config";
import { MyToolBar } from "./components/Toolbar";
import "./styles.less";

//初始化树
const useGraph = ({ containerRef, config }) => {
  const [graph, setGraph] = useState(null);
  const renderedRef = useRef(false); // 是否已生成图

  useEffect(() => {
    const container = ReactDOM.findDOMNode(containerRef.current);
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const defaultConfig = getDefaultConfig({ width, height });
    if (!renderedRef.current) {
      const graph = new Graph({
        container,
        ...defaultConfig,
        ...config
      });
      //   graph.fromJSON(data);
      if (graph) {
        // 不会重复生成图
        renderedRef.current = true; // 标记图已生成
        setGraph(graph);
      }
    }
  }, [containerRef, config]);

  return { graph };
};

export const X6MarketTree = (props) => {
  const { handleEvent, style, onMounted, config, readOnly } = props;
  const ref = useRef(null);
  const eventRef = useRef(handleEvent);
  const { graph } = useGraph({
    containerRef: ref,
    config
  });
  eventRef.current = handleEvent;

  // 注册节点
  useEffect(() => {
    if (graph) {
      register({
        graph,
        eventRef,
      });
      const utils = getUtils(graph);
      onMounted(utils);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph]);

  return (
    <div style={style} className="x6-market-tree">
      <MyToolBar graph={graph}></MyToolBar>
      <div
        ref={ref}
        className="x6-market-tree-content"
        id="x6-tree-container"
      ></div>
    </div>
  );
};
