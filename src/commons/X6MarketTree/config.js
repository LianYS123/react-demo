export const getDefaultConfig = ({ width, height }) => {
  return {
    width,
    height,
    background: {
      //   color: "#fffbe6", //画布背景色
    },
    // interacting: false,
    grid: {
      size: 10, //网格大小
      visible: true, //渲染背景
      color: "#c5baba",
      type: "mesh",
    },
    scroller: {
      enabled: true,
      pannable: true,
    },
    mousewheel: {
      enabled: true,
      modifiers: ["ctrl", "meta"],
    },
    // connecting: {
    //   connector: {
    //     name: 'smooth',
    //     args: {
    //       direction: 'V'
    //     }
    //   },
    // },
  };
};
