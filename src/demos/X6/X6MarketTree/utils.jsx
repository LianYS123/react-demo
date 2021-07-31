import React from "react";
import { getRootMenu, getMenu, getSettingMenu } from "./menus";
import { DECISION_TYPE, BaseContentMap, BaseTitleMap } from "./constants";

// 根节点
export const addRootNode = (utils, { event, eventList, menu } = {}) => {
  const { addNode } = utils;
  const { eventName = "请设置" } = event || {};
  const root = addNode({
    nodeName: eventName,
    content: eventName,
    nodeType: 'EVENT',
    color: "blue",
    menu: menu || getRootMenu(eventList),
    ...event
  });
  return root;
};

// 添加子节点
export const addSubNode = (utils, pnode, config = {}) => {
  const { addNodeWithEdge } = utils;
  const {
    event,
    nodeData = {},
    lineData = {},
    sub,
    menu = getMenu(nodeData, event),
    ...rest
  } = config;
  const { nodeName = "请设置", cptType, nodeAdds = [] } = nodeData;
  const { policyName } = lineData;
  const nodeType = pnode.getData().nodeType === 'EVENT' ? "ROOT" : 'NORMAL';
  const contentMap = {
    ...BaseContentMap,
    [DECISION_TYPE.ACTION]: (
      <>
        {nodeAdds.map((it, i) => (
          <div key={i}>{it.bizName}</div>
        ))}
      </>
    )
  };
  const content = contentMap[cptType] || sub || "";
  const subNode = addNodeWithEdge(
    pnode,
    {
      nodeType,
      ...nodeData,
      nodeName,
      menu,
      content,
      color: cptType === "ACTION" ? "purple" : "green",
      ...rest
    },
    policyName ? { label: policyName, data: lineData } : undefined
  );
  return subNode;
};


// 更新节点
export const updateNode = (utils, node, nodeData) => {
  const {
    cptType,
    nodeName = BaseTitleMap[cptType],
    nodeAdds = [],
    sub,
    menu
  } = { ...node.getData(), ...nodeData };
  const contentMap = {
    ...BaseContentMap,
    [DECISION_TYPE.ACTION]: (
      <>
        {nodeAdds.map((it, i) => (
          <div key={i}>{it.bizName}</div>
        ))}
      </>
    )
  };
  const content = contentMap[cptType] || sub || "";
  const newData = {
    cptType,
    nodeName,
    content,
    color: cptType === "ACTION" ? "purple" : "green"
  };
  node.updateData({
    ...newData,
    menu: menu || getMenu(newData)
  });
};

// 添加设置节点
export const addSettingNode = (utils, pnode, lineData, nodeData) => {
  return addSubNode(utils, pnode, {
    lineData,
    nodeData,
    sub: "请设置",
    menu: getSettingMenu()
  });
};

// 获取节点的边数据和直接子节点
export const getPolicysAndSubNodes = (utils, node) => {
  const { findEdgesFromNode, graph } = utils;
  const edges = findEdgesFromNode(node);
  const policys = [];
  const subNodes = [];
  if (edges.length) {
    edges.forEach(edge => {
      const nodeId = edge.getTarget().cell;
      const nextNode = graph.getCellById(nodeId);
      const policy = edge.getData() || {};
      policys.push(policy);
      subNodes.push(nextNode);
    });
  }
  return { policys, subNodes, edges };
};

export const getUtils = utils => {
  const nodeToolWrapper = fn => {
    return (...args) => {
      const { graph, layout } = utils;
      graph.freeze();
      const res = fn(utils, ...args);
      layout();
      return res;
    };
  };

  return {
    addRootNode: nodeToolWrapper(addRootNode),
    addSubNode: nodeToolWrapper(addSubNode),
    addSettingNode: nodeToolWrapper(addSettingNode),
    updateNode: nodeToolWrapper(updateNode),
    getPolicysAndSubNodes: nodeToolWrapper(getPolicysAndSubNodes)
  };
};
