// 注册事件
export const registerEventsFn = ({graph, events = {}}) => {
  const handleCollapse = (e) => {
    console.log(e);
    const target = e.target;
    const id = target.get("modelId");
    const item = graph.findById(id);
    const nodeModel = item.getModel();
    nodeModel.collapsed = !nodeModel.collapsed;
    graph.layout();
    graph.setItemState(item, "collapse", nodeModel.collapsed);
  };
  graph.on("collapse-text:click", (e) => {
    handleCollapse(e);
  });
  graph.on("collapse-back:click", (e) => {
    handleCollapse(e);
  });
};
