// 业务数据转换函数
export const createNodesByServiceData = (utils, root, treeNode, event) => {
  const { layout, graph, addSubNode } = utils;
  graph.freeze();

  const loop = (pnode, nodeData, lineData = {}) => {
    const { policys } = nodeData;
    const subNode = addSubNode(pnode, {
      event,
      lineData,
      nodeData
    });

    if (policys && policys.length) {
      policys.forEach(policy => {
        const { nextTreeNode, ...rest } = policy;
        loop(subNode, nextTreeNode, rest);
      });
    }
  };
  loop(root, treeNode);
  // graph.unfreeze();
  layout();
};

// 将树转换为json
export const convertGraphToServiceData = (utils, root) => {
  const { getPolicysAndSubNodes } = utils;
  const loop = node => {
    const treeNode = {};
    // 剔除无用数据
    const {
      menu,
      sub,
      nodeData: n,
      lineData,
      content,
      visible,
      color,
      ...nodeData
    } = node.getData();
    Object.assign(treeNode, nodeData);
    const { policys, subNodes } = getPolicysAndSubNodes(node);
    if (policys.length) {
      treeNode.policys = policys;
      policys.forEach((policy, index) => {
        policy.nextTreeNode = loop(subNodes[index]);
      });
    }
    return treeNode;
  };
  return loop(root);
  // const { policys } = loop(root);
  // return policys.length ? policys[0].nextTreeNode : null; // 不会导出根节点
};
