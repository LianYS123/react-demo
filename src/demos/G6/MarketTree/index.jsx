import React from 'react';
import ReactDOM from "react-dom";
import G6 from "@antv/g6";
import { useEffect, useRef, useState } from "react";
import { mockData, mockData2 } from "./mockData";
import { tooltip, menu } from "./plugins";
import { registerEventsFn } from "./events";
import { getDefaultConfig } from "./config";
import { getFakeData } from "utils";
import { Button, Space } from "antd";
import { usePosition } from "./hooks";
import "./styles.less";

const initGraph = ({ defaultConfig, config = {} }) => {
  const graph = new G6.TreeGraph({
    container: "container",
    ...defaultConfig,
    ...config,
    plugins: [tooltip, menu],
  });
  return graph;
};

const useGraph = ({ data, containerRef, config }) => {
  const [graph, setGraph] = useState(null);
  const renderedRef = useRef(false); // 是否已生成图

  //初始化树
  useEffect(() => {
    const container = ReactDOM.findDOMNode(containerRef.current);
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const defaultConfig = getDefaultConfig({ width, height });
    if (!renderedRef.current) {
      const graph = initGraph({ defaultConfig, container, config });
      if (graph) {
        // 不会重复生成图
        renderedRef.current = true; // 标记图已生成
        setGraph(graph);
        // resize
        const resize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };

        window.addEventListener("resize", resize);

        return () => {
          window.removeEventListener("resize", resize);
        };
      }
    }
  }, [data, containerRef, config]);

  // 初始数据变化时，同步更新图
  useEffect(() => {
    if (graph) {
      graph.data(data);
      graph.render();
      // graph.zoom((config || {}).defaultZoom || 1);
      graph.fitView();
    }
  }, [data, graph, config]);

  return { graph };
};

export const MarketTree = (props) => {
  const { data: _data = mockData, events, config } = props;

  const [data, setData] = useState(_data);
  const ref = useRef(null);
  const { graph } = useGraph({ data, containerRef: ref, config });
  const getData = () => {
    const data = graph.findDataById("root");
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
  };
  useEffect(() => {
    if (graph) {
      // 注册事件
      registerEventsFn({ graph, events });
      console.log(graph);
    }
  }, [graph, events]);
  useEffect(() => {
    const dataStr = localStorage.getItem("data");
    getFakeData(dataStr ? JSON.parse(dataStr) : mockData2).then(setData);
  }, []);
  return (
    <div className="market-tree-wrapper">
      <div className="tree-tool-bar">
        <Space>
          <Button onClick={() => getData()}>save</Button>
        </Space>
      </div>
      <div ref={ref} className="container" id="container"></div>
    </div>
  );
};
