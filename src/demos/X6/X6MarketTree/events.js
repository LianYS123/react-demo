import { useState, useRef, useEffect, useCallback } from "react";
import { getBaseMenu } from "./menus";
import { useMouse } from "hooks";
import { actions } from "./actions";
import { BaseTitleMap } from "./constants";
import { notification } from "antd";

const handleDelete = ({ node, utils }) => {
  const { removeNode } = utils;
  const { nodeType } = node.getData();
  if (nodeType === "ROOT" || nodeType === "EVENT") {
    notification.error({
      message: "无法删除该节点"
    });
  } else {
    removeNode(node);
  }
};

const handleAdd = ({ node, utils }) => {
  const { addSettingNode } = utils;
  addSettingNode(node);
};

// 添加分支
const addBranch = ({ node, utils, config }) => {
  const { addSettingNode } = utils;
  // const nodeData = node.getData();
  const { cptType } = config;
  console.log(cptType);
  addSettingNode(node, {
    policyName: "其他",
    policyValue: "OTHER"
  });
  // const updateData = _data => {
  //   const data = Array.isArray(_data) ? _data : [_data];
  //   data.forEach(it => addSettingNode(node, it));
  // };
  // actions[cptType]({
  //   onConfirm: updateData,
  //   ...nodeData
  // });
};

// 编辑分支
const editBranch = ({ node, utils, config }) => {
  const { getPolicysAndSubNodes, graph, addSettingNode } = utils;
  const nodeData = node.getData();
  const { policys, edges } = getPolicysAndSubNodes(node);
  console.log(policys);
  const { cptType } = config;

  const updateData = _data => {
    const data = Array.isArray(_data) ? _data : [_data];
    console.log(data);
    for (let i = 0; i < Math.max(edges.length, data.length); i++) {
      const edge = edges[i];
      const newData = data[i];
      if (i >= data.length) {
        graph.removeCell(edge); // 删除多出来的边
      } else if (i >= edges.length) {
        addSettingNode(node, newData); // 新增边
      } else {
        const { policyName } = newData;
        if (policyName) {
          edge.setLabels([policyName]);
        }
        edge.updateData(newData);
      }
    }
  };

  actions[cptType]({
    onConfirm: updateData,
    ...nodeData,
    policys
  });
};

const setRootMenu = ({ node, utils, config }) => {
  const { eventName } = config.event;
  const { addSettingNode } = utils;
  addSettingNode(node);
  node.updateData({
    nodeName: eventName,
    content: eventName,
    menu: []
    // nodeType: "ROOT"
  });
};

const setTargetCustomer = ({ node, utils, config }) => {
  const { addSettingNode, updateNode } = utils;
  const { cptType } = config;
  const nodeName = BaseTitleMap[cptType];
  actions[cptType]({
    onConfirm: data => {
      // 更新节点
      updateNode(node, {
        nodeName,
        menu: getBaseMenu({
          nodeName,
          cptType
        }),
        cptType
      });
      addSettingNode(node, data);
    }
  });
};

const setAction = ({ utils, node, config }) => {
  const { updateNode } = utils;
  const { cptType } = config;
  actions[cptType]({
    onConfirm: data => {
      // 更新节点
      updateNode(node, {
        nodeName: BaseTitleMap[cptType],
        cptType,
        ...data
      });
    }
  });
};

// 连线
const useConnecting = utils => {
  const [connecting, setConnecting] = useState();
  const startNode = useRef(null);
  const edgeRef = useRef(null);
  const { clientX, clientY } = useMouse();
  const { graph } = utils;

  const cancel = useCallback(() => {
    if (edgeRef.current) {
      graph.removeCell(edgeRef.current);
    }
    setConnecting(false);
    utils.updateData({ visible: 1 });
  }, [utils, graph]);

  useEffect(() => {
    if (connecting) {
      const p = graph.clientToLocal({ x: clientX - 10, y: clientY - 10 });
      if (edgeRef.current) {
        edgeRef.current.setTarget(p);
      }
    } else if (edgeRef.current) {
      utils.removeNode(edgeRef.current);
    }
  }, [clientX, clientY, connecting, graph, utils]);

  useEffect(() => {
    document.addEventListener("contextmenu", cancel);
    return () => document.removeEventListener("contextmenu", cancel);
  }, [cancel]);

  const canBeConnected = node => {
    const { nodeType } = node.getData();
    const edges = utils.findEdgesToNode(node);
    return !edges.length && nodeType !== "ROOT" && nodeType !== "EVENT";
  };

  const updateNodeVisible = () => {
    const nodes = graph.getNodes();
    nodes.forEach(node => {
      // const { cptType } = node.getData();
      // if (cptType === "ACTION") {
      node.updateData({
        visible: canBeConnected(node) ? 1 : 0.5
      });
      // }
    });
  };

  const connectStart = ({ node }) => {
    if (!connecting) {
      startNode.current = node;
      const p = graph.clientToLocal({ x: clientX - 10, y: clientY - 10 });
      edgeRef.current = graph.addEdge({
        source: node,
        target: p,
        attrs: {
          line: {
            strokeDasharray: "5 5",
            stroke: "#a0a0a0",
            strokeWidth: 1
          }
        }
      });
      updateNodeVisible();
      setConnecting(true);
    }
  };

  const connectEnd = ({ node }) => {
    if (connecting) {
      if (canBeConnected(node)) {
        // graph.freeze();
        utils.addEdge(startNode.current, node);
        cancel();
        // utils.layout();
      } else {
        notification.error({ message: "无法连接该节点" });
        cancel();
      }
    }
  };

  return { connecting, connectStart, connectEnd };
};

export const useEvents = ({ utils }) => {
  const { connecting, connectStart, connectEnd } = useConnecting(utils);

  const handleEvent = (node, config) => {
    const { command } = config;
    const events = {
      delete: handleDelete,
      add: handleAdd,
      setRootMenu,
      connectStart,
      connectEnd,
      setTargetCustomer,
      setAction,
      addBranch,
      editBranch
    };
    events[command]({ node, utils, config });
  };
  return {
    connecting,
    handleEvent
  };
};
