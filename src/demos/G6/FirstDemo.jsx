import G6 from "@antv/g6";
import { createRender } from "./Render";
import request from "utils/request";
import './styles.less';

// const initData = {
//   nodes: [
//     {
//       id: "node1",
//       x: 100,
//       y: 200,
//       label: "起始点",
//     },
//     {
//       id: "node2",
//       x: 300,
//       y: 200,
//       label: "目标点",
//     },
//   ],
//   edges: [
//     {
//       source: "node1", // 从哪个节点
//       target: "node2", // 到哪个节点
//       label: "线", // 线名称
//     },
//   ],
// };

// const container = document.createElement("div");
// const elementId = "mountNode";
// container.id = elementId;

const render = async () => {
  // 插件
  const miniMap = new G6.Minimap({
    size: [100, 100],
    className: "minimap",
    type: "delegate",
  });
  const graph = new G6.Graph({
    container: "mountNode", // 挂载容器
    width: 800,
    height: 500,
    // fitView: true, //设置是否将图适配到画布中；
    // fitViewPadding: [20, 40, 50, 20], //画布上四周的留白宽度。
    defaultNode: {
      style: {
        fill: "steelblue",
        stroke: "#666",
        lineWidth: 1,
      },
      size: 30,
      //文本样式
      labelCfg: {
        style: {
          fill: "#fff",
        },
      },
    },
    defaultEdge: {
      style: {
        opacity: 0.6,
        stroke: "grey",
      },
      labelCfg: {
        // 文字自动旋转
        autoRotate: true,
      },
    },
    layout: {
      type: "force",
      preventOverlap: true, // 防止节点重叠
      // nodeSize: 30 //用于碰撞检测, 节点有size不用配
      linkDistance: 100, // 指定边距离为100 松一点
    },
    // 模式
    modes: {
      // 默认行为
      default: [
        "drag-canvas",
        "zoom-canvas",
        "drag-node",
        {
          type: "tooltip", // 提示框 节点提示框， 边提示框传'edge-tooltip'
          formatText(model) {
            // 提示框文本内容
            const text =
              "label: " + model.label + "<br/> class: " + model.class;
            return text;
          },
        },
      ],
      // 编辑模式下的行为， 不允许拖拽等
      edit: [],
    },
    // 节点不同状态下的样式
    nodeStateStyles: {
      hover: {
        fill: "lightsteelblue",
      },
      click: {
        stroke: "#000",
        lineWidth: 3,
      },
    },
    edgeStateStyles: {
      click: {
        stroke: "steelblue",
      },
    },
    // 使用插件
    plugins: [miniMap],
    animate: true // 全局变化时使用动画过度
  });

  //监听事件
  graph.on("node:mouseenter", (e) => {
    graph.setItemState(e.item, "hover", true); //需要手动设置状态。。。
  });

  // 鼠标离开节点
  graph.on("node:mouseleave", (e) => {
    const nodeItem = e.item; // 获取鼠标离开的节点元素对象
    graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
  });

  // 点击节点
  graph.on("node:click", (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState("node", "click");
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, "click", false);
    });
    const nodeItem = e.item; // 获取被点击的节点元素对象
    graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
  });

  // 点击边
  graph.on("edge:click", (e) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graph.findAllByState("edge", "click");
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, "click", false);
    });
    const edgeItem = e.item; // 获取被点击的边元素对象
    graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
  });

  // 渲染数据
  const remoteData = await request(
    "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
  );
  const nodes = remoteData.nodes;
  nodes.forEach((node) => {
    if (!node.style) {
      node.style = {};
    }
    switch (
      node.class // 根据节点数据中的 class 属性配置图形
    ) {
      case "c0": {
        node.type = "circle"; // class = 'c0' 时节点图形为 circle
        break;
      }
      case "c1": {
        node.type = "rect"; // class = 'c1' 时节点图形为 rect
        node.size = [35, 20]; // class = 'c1' 时节点大小
        break;
      }
      case "c2": {
        node.type = "ellipse"; // class = 'c2' 时节点图形为 ellipse
        node.size = [35, 20]; // class = 'c2' 时节点大小
        break;
      }
      default: {
        break;
      }
    }
  });

  const edges = remoteData.edges;
  edges.forEach((edge) => {
    if (!edge.style) {
      edge.style = {};
    }
    edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
    // 解决全局默认配置失效问题
    edge.style.opacity = 0.6;
    edge.style.stroke = "grey";
  });

  graph.data(remoteData);
  graph.render(); // 渲染
};

export const FirstDemo = createRender(render);
