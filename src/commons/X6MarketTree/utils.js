import dagre from "dagre";
import { NODE_WIDTH, NODE_HEIGHT } from "./components/ReactNode";

export function createNode(props) {
  const { graph, ...data } = props;
  const node = graph.createNode({
    shape: "react-shape",
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    component: "market-node",
    data
  });
  return node;
}

export function createEdge({ graph, source, target, ...rest }) {
  return graph.createEdge({
    shape: "org-edge",
    source: { cell: source.id },
    target: { cell: target.id },
    ...rest
  });
}

// 自动布局
const dir = "TB"; // LR RL TB BT

// 自动布局
export function layout(graph) {
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: dir, nodesep: 30, ranksep: 50 });
  g.setDefaultEdgeLabel(() => ({}));

  const width = 260;
  const height = 90;
  nodes.forEach(node => {
    g.setNode(node.id, { width, height });
  });

  edges.forEach(edge => {
    const source = edge.getSource();
    const target = edge.getTarget();
    g.setEdge(source.cell, target.cell);
  });

  dagre.layout(g);

  graph.freeze();

  g.nodes().forEach(id => {
    const node = graph.getCell(id);
    if (node) {
      const pos = g.node(id);
      if (pos) {
        node.position(pos.x, pos.y);
      }
    }
  });

  edges.forEach(edge => {
    const source = edge.getSourceNode();
    const target = edge.getTargetNode();
    const sourceBBox = source.getBBox();
    const targetBBox = target.getBBox();

    if ((dir === "LR" || dir === "RL") && sourceBBox.y !== targetBBox.y) {
      const gap =
        dir === "LR"
          ? targetBBox.x - sourceBBox.x - sourceBBox.width
          : -sourceBBox.x + targetBBox.x + targetBBox.width;
      const fix = dir === "LR" ? sourceBBox.width : 0;
      const x = sourceBBox.x + fix + gap / 2;
      edge.setVertices([
        { x, y: sourceBBox.center.y },
        { x, y: targetBBox.center.y }
      ]);
    } else if (
      (dir === "TB" || dir === "BT") &&
      sourceBBox.x !== targetBBox.x
    ) {
      const gap =
        dir === "TB"
          ? targetBBox.y - sourceBBox.y - sourceBBox.height
          : -sourceBBox.y + targetBBox.y + targetBBox.height;
      const fix = dir === "TB" ? sourceBBox.height : 0;
      const y = sourceBBox.y + fix + gap / 2;
      edge.setVertices([
        { x: sourceBBox.center.x, y },
        { x: targetBBox.center.x, y }
      ]);
    } else {
      edge.setVertices([]);
    }
  });

  graph.unfreeze();
  graph.centerContent();
}

const addNodeWithEdge = (graph, node, opt, edgeOpt = {}) => {
  const member = createNode({ graph, ...opt });
  const line = createEdge({
    graph,
    source: node,
    target: member,
    ...edgeOpt
  });
  graph.addCell([member, line]);
  return member;
};

const updateNodeWithEdge = (graph, node, nodeData, lineData = {}) => {
  const edges = findEdgesToNode(graph, node);
  if (edges && edges.length) {
    const line = edges[0];
    const nodeId = line.getTarget().cell;
    const target = graph.getCellById(nodeId);
    target.updateData(nodeData);
    line.updateData(lineData);
    return target;
  }
};

const updateData = (graph, data) => {
  const nodes = graph.getNodes();
  nodes.forEach(node => node.updateData(data));
};

const findEdgesFromNode = (graph, node) => {
  const edges = graph.getEdges();
  return edges.filter(edge => {
    const sourceId = edge.getSource().cell;
    return sourceId === node.id;
  });
};

const findEdgesToNode = (graph, node) => {
  const edges = graph.getEdges();
  return edges.filter(edge => {
    const targetId = edge.getTarget().cell;
    return targetId === node.id;
  });
};

export const getUtils = graph => {
  const utils = {
    graph,
    addNodeWithEdge: (...rest) => addNodeWithEdge(graph, ...rest),
    updateNodeWithEdge: (...rest) => updateNodeWithEdge(graph, ...rest),
    addNode: params => {
      const node = createNode({ graph, ...params });
      graph.addCell(node);
      return node;
    },
    addEdge: (source, target) => {
      const node = createEdge({
        graph,
        source,
        target
      });
      graph.addCell(node);
      return node;
    },
    removeNode: node => graph.removeCell(node),
    layout: () => layout(graph),
    getJSONString: () => JSON.stringify(graph.toJSON()),
    updateData: data => updateData(graph, data),
    findEdgesFromNode: node => findEdgesFromNode(graph, node),
    findEdgesToNode: node => findEdgesToNode(graph, node)
  };
  return utils;
};
