const defaultStateStyles = {
  hover: {
    stroke: "#1890ff",
    lineWidth: 2,
  },
};

const defaultNodeStyle = {
  fill: "#91d5ff",
  stroke: "#40a9ff",
  radius: 5,
};

const defaultEdgeStyle = {
  stroke: "#91d5ff",
  endArrow: {
    path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
    fill: "#91d5ff",
    d: -20,
  },
};

const defaultLayout = {
  type: "compactBox",
  direction: "TB",
  getId: function getId(d) {
    return d.id;
  },
  getHeight: function getHeight() {
    return 16;
  },
  getWidth: function getWidth() {
    return 16;
  },
  getVGap: function getVGap() {
    return 40;
  },
  getHGap: function getHGap() {
    return 70;
  },
};

const defaultLabelCfg = {
  style: {
    fill: "#000",
    fontSize: 12,
  },
};

// 默认配置
export const getDefaultConfig = ({ width, height }) => {
  const defaultConfig = {
    container: "container",
    width,
    height,
    linkCenter: true,
    modes: {
      default: ["drag-canvas", "zoom-canvas"],
    },
    defaultNode: {
      type: "icon-node",
      size: [120, 40],
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg,
    },
    defaultEdge: {
      type: "flow-line",
      style: defaultEdgeStyle,
    },
    nodeStateStyles: defaultStateStyles,
    edgeStateStyles: defaultStateStyles,
    layout: defaultLayout,
  };
  return defaultConfig;
};
