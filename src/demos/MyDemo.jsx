import React from "react";
import { ReactDiagram } from "gojs-react";
import { CLIENT_CYCLE_TYPES } from "constants/index";
import * as go from "gojs";

const interval = 260;

const initDiagram = () => {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram, {
    //创建根点
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key",
    }),
    // 选中时的边框样式
    nodeSelectionAdornmentTemplate: $(
      go.Adornment,
      "Auto",
      $(go.Shape, "Rectangle", { fill: "white", stroke: null })
    ),
  });
  diagram.nodeTemplate = $(
    go.Node,
    // go.Panel.Spot, // 也可以是字符串常量，表示布局方式
    // "Spot", // 形状将围绕TextBlock
    go.Panel.Position,
    new go.Binding("position"),
    {
      deletable: false, //禁止删除
      // movable: false, //禁止拖动
    },
    $(
      go.Panel,
      // go.Panel.Auto, //居中？
      "Auto",
      // 定义Panel的形状属性
      $(go.Shape, "Rectangle", {
        stroke: "red",
        fill: $(go.Brush, "Linear", {
          //渐变刷子
          0: "#fff",
          1: "#fff",
        }),
      }),

      //Panel中的文字信息
      $(
        go.Panel,
        go.Panel.Vertical, //画板子元素垂直排列
        $(
          go.Panel,
          go.Panel.Horizontal, //画板子元素水平排列
          $(
            go.TextBlock,
            {
              // 字体样式
              margin: new go.Margin(5, 5, 5, 10),
              maxSize: new go.Size(100, NaN), // 字体大小
              stroke: "rgba(0, 0, 0, .90)",
              font: "15px Segoe UI, sans-serif",
            },
            new go.Binding("text", "title")
          ),
          $(
            go.TextBlock,
            {
              // 字体样式
              margin: new go.Margin(5, 10, 5, 5),
              maxSize: new go.Size(100, NaN), // 字体大小
              stroke: "rgba(0, 0, 0, .50)", // 字体颜色
              font: "12px Segoe UI, sans-serif",
            },
            new go.Binding("text", "desc")
          )
        ),
        $(
          go.TextBlock,
          {
            // 字体样式
            margin: new go.Margin(5, 10, 5, 10),
            maxSize: new go.Size(100, NaN), // 字体大小
            stroke: "rgba(0, 0, 0, .90)", // 字体颜色
            font: "20px Segoe UI, sans-serif",
          },
          new go.Binding("text", "num")
        )
      )
      // $(
      //   go.Shape,
      //   "Rectangle",
      //   {
      //     height: 20,
      //   },
      //   new go.Binding("fill", "primaryColor")
      // )
    )
  );

  diagram.linkTemplate = $(
    go.Link,
    {
      routing: go.Link.AvoidsNodes, // 连线避开节点
      curve: go.Link.JumpOver,
    },
    {
      layerName: "Background",
      curviness: 20,
      corner: 5,
    },
    $(go.Shape, {
      strokeWidth: 1,
      stroke: "black", // 边框的颜色
    }),
    $(go.Shape, {
      toArrow: "Standard", // 箭头
      stroke: "black", // 边框的颜色
      fill: $(go.Brush, "Linear", {
        // 填充色
        0: "black",
        1: "black",
      }),
    })
  );
  return diagram; //一定要将生成的图返回出去
};

const App = () => {
  return (
    <ReactDiagram
      divClassName="diagram-component"
      initDiagram={initDiagram}
      nodeDataArray={[
        // 1-5
        ...Object.values(CLIENT_CYCLE_TYPES)
          .slice(0, 5)
          .map((it, index) => ({
            ...it,
            key: index + 1,
            position: new go.Point(index * interval, 0),
          })),
        // 6,7
        {
          key: 6,
          ...CLIENT_CYCLE_TYPES.休眠客,
          position: new go.Point(interval * 2, interval),
        },
        {
          key: 7,
          ...CLIENT_CYCLE_TYPES.高价值流失,
          position: new go.Point(interval * 3.5, interval),
        },
        // 8
        {
          key: 8,
          ...CLIENT_CYCLE_TYPES.低价值流失,
          position: new go.Point(interval * 3.5, interval * 2),
        },
      ]}
      linkDataArray={[
        // 1->2, 2->3, 3->4
        ...[1, 2, 3].map((n) => ({ from: n, to: n + 1 })),
        // 1,2,3,4,5 -> 6
        ...[1, 2, 3, 4, 5].map((n) => ({ from: n, to: 6 })),

        // 5 -> 3
        {
          from: 5,
          to: 3,
        },

        // 6 -> 5,7,8
        ...[5, 7, 8].map((n) => ({ from: 6, to: n })),

        // 7,8 -> 5
        {
          from: 7,
          to: 5,
        },
        {
          from: 8,
          to: 5,
        },
      ]}
    />
  );
};

export default App;
