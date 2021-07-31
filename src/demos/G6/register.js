import G6 from "@antv/g6";

// 自定义节点、边
/**
 * 自定义节点
 */

G6.registerNode(
  "icon-node",
  {
    options: {
      size: [60, 20],
      stroke: "#91d5ff",
      fill: "#91d5ff",
    },
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      const { labelCfg = {} } = cfg;

      const w = styles.width;
      const h = styles.height;

      const keyShape = group.addShape("rect", {
        attrs: {
          ...styles,
          x: -w / 2,
          y: -h / 2,
        },
      });

      /**
       * leftIcon 格式如下：
       *  {
       *    style: ShapeStyle;
       *    img: ''
       *  }
       */
      console.log("cfg.leftIcon", cfg.leftIcon);
      if (cfg.leftIcon) {
        const { style, img } = cfg.leftIcon;
        group.addShape("rect", {
          attrs: {
            x: 1 - w / 2,
            y: 1 - h / 2,
            width: 38,
            height: styles.height - 2,
            fill: "#8c8c8c",
            ...style,
          },
        });

        group.addShape("image", {
          attrs: {
            x: 8 - w / 2,
            y: 8 - h / 2,
            width: 24,
            height: 24,
            img:
              img ||
              "https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png",
          },
          name: "image-shape",
        });
      }

      if (cfg.label) {
        group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: cfg.label,
            x: 50 - w / 2,
            y: 25 - h / 2,
          },
        });
      }

      return keyShape;
    },
    update: undefined,
  },
  "rect"
);

G6.registerEdge("flow-line", {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const { style } = cfg;
    const shape = group.addShape("path", {
      attrs: {
        stroke: style.stroke,
        endArrow: style.endArrow,
        path: [
          ["M", startPoint.x, startPoint.y],
          ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
          ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
          ["L", endPoint.x, endPoint.y],
        ],
      },
    });

    return shape;
  },
});
