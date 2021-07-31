import { delay } from "utils";
export const getEventMarketTreeData = async () => {
  await delay();
  return {
    nodes: [
      {
        id: "node1",
        x: 100,
        y: 200,
        label: "注册成功",
      },
      {
        id: "node2",
        x: 100,
        y: 300,
        label: "概率",
      },
      {
        id: "node3",
        x: 100,
        y: 400,
        label: "请设置",
      },
      {
        id: "node4",
        x: 200,
        y: 400,
        label: "请设置",
      },
      {
        id: "node5",
        x: 300,
        y: 400,
        label: "请设置",
      },
    ],
    edges: [
      {
        source: "node1",
        target: "node2",
        label: "",
      },
    ],
  };
};
