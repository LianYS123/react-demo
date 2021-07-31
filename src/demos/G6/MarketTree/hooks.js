import { useEffect, useState } from "react";

// 获取鼠标在画布的位置
export const usePosition = (graph) => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    if (graph) {
      // 监听 node 上面 mouse 事件
      graph.on("node:mouseenter", (evt) => {
        const { item } = evt;
        const model = item.getModel();
        const { x, y } = model;
        const point = graph.getCanvasByPoint(x, y);
        setPosition({
          x: point.x,
          y: point.y,
        });
      });
    }
  }, [graph]);
  return position;
};
