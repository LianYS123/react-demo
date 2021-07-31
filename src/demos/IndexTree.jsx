import React, { Component } from "react";
import { ReactDiagram } from "gojs-react";
import * as go from "gojs";

const borderColor = "#777";
const strokeWidth = 1;

export default class indexTree extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.diagramRef = React.createRef();
    this.state = {
      nodeDataArray: [
        { key: 1, text: "No flow to receiver", figure: "None" },
        {
          key: 2,
          text: "No flow from Component B",
          parent: 1,
          figure: "OrGate",
          choice: "G02",
        },
        {
          key: 3,
          text: "No flow into Component B",
          parent: 2,
          figure: "AndGate",
          choice: "G03",
        },
        {
          key: 4,
          text: "Component B blocks flow",
          parent: 2,
          figure: "Circle",
          choice: "B01",
        },
        {
          key: 5,
          text: "No flow from Component A1",
          parent: 3,
          figure: "OrGate",
          choice: "G04",
        },
        {
          key: 6,
          text: "No flow from Component A2",
          parent: 3,
          figure: "OrGate",
          choice: "G05",
        },
        {
          key: 7,
          text: "No flow from source1",
          parent: 5,
          figure: "Triangle",
          choice: "T01",
        },
        {
          key: 8,
          text: "Component A1 blocks flow",
          parent: 5,
          figure: "Circle",
          fill: "green",
          choice: "B02",
        },
        {
          key: 9,
          text: "No flow from source2",
          parent: 6,
          figure: "Triangle",
          choice: "T02",
        },
        {
          key: 10,
          text: "Component A2 blocks flow",
          parent: 6,
          figure: "Circle",
          choice: "B03",
        },
      ],
    };
  }
  componentDidMount() {}

  initDiagram() {
    const $ = go.GraphObject.make;
    // 1、初始化画布
    const diagram = $(go.Diagram, {
      allowCopy: false,
      allowDelete: false,
      "draggingTool.dragsTree": true,
      "undoManager.isEnabled": true,
    });
    diagram.layout = $(go.TreeLayout, {
      angle: 90,
      layerSpacing: 30,
    });
    diagram.model = $(go.TreeModel, {
      // linkKeyProperty: 'key' // 使用GraphLinksModel时应始终设置此项
    });

    diagram.addDiagramListener("ObjectSingleClicked", function (e) {
      console.log(e);
      console.log(e.subject);
      console.log(e.parameter);
    });

    // 树折叠事件
    diagram.addDiagramListener("TreeCollapsed", function (e) {
      // console.log(e);
      // console.log('折叠');
    });

    // 树展开事件
    diagram.addDiagramListener("TreeExpanded", function (e) {
      // console.log(e);
      // console.log('展开');
    });

    // 面板的颜色
    function nodeFillConverter(figure) {
      switch (figure) {
        case "AndGate":
          // right to left so when it's rotated, it goes from top to bottom
          return $(go.Brush, "Linear", {
            0: "#EA8100",
            1: "#C66D00",
            start: go.Spot.Right,
            end: go.Spot.Left,
          });
        case "OrGate":
          return $(go.Brush, "Linear", {
            0: "#0058D3",
            1: "#004FB7",
            start: go.Spot.Right,
            end: go.Spot.Left,
          });
        case "Circle":
          return $(go.Brush, "Linear", {
            0: "#009620",
            1: "#007717",
          });
        case "Triangle":
          return $(go.Brush, "Linear", {
            0: "#7A0099",
            1: "#63007F",
          });
        case "Diamond":
          return $(go.Brush, "Linear", {
            0: "#fff",
            1: "#fff",
          });
        default:
          return "whitesmoke";
      }
    }

    /**
     * 边框样式设置
     * @param {type} 判断是测点还是指标
     */
    function borderStroke(type) {
      switch (type) {
        case "cd":
          return "#8EDA87";
        case "zb":
          return borderColor;
        default:
          return borderColor;
      }
    }

    // 2、定义node模型
    diagram.nodeTemplate = $(
      go.Node,
      "Spot", // 形状将围绕TextBlock
      {
        selectionObjectName: "BODY",
        locationSpot: go.Spot.Center,
        locationObjectName: "BODY",
        // movable: false, //禁止拖动
        deletable: false, //禁止删除
      },
      $(
        go.Panel,
        "Auto",
        {
          name: "BODY",
          portId: "",
        },
        $(
          go.Shape,
          "RoundedRectangle",
          {
            // 面板样式
            fill: $(go.Brush, "Linear", {
              0: "#fff",
              1: "#fff",
            }),
            //stroke: borderColor
          },
          new go.Binding("type"),
          new go.Binding("stroke", "type", borderStroke) // 内容的颜色
        ),
        $(
          go.TextBlock,
          {
            // 字体样式
            margin: new go.Margin(5, 10, 5, 10),
            maxSize: new go.Size(100, NaN), // 字体大小
            stroke: "rgba(0, 0, 0, .90)", // 字体颜色
            font: "10pt Segoe UI, sans-serif",
          },
          new go.Binding("text")
        ),
        {
          click: function (e, node) {
            // 双击事件
            console.log(node);
          },
        }
      ),
      // 矩形与形状图标连接的线
      $(
        go.Shape,
        "LineV",
        new go.Binding("visible", "figure", function (f) {
          return f !== "None";
        }),
        {
          strokeWidth: strokeWidth,
          height: 30, // 底部的线的高度
          alignment: new go.Spot(0.5, 1, 0, 17), // x, y, offx, offy
          alignmentFocus: go.Spot.Center,
          stroke: borderColor, // 边框的颜色
        }
      ),
      // 边框
      $(
        go.Shape,
        new go.Binding("visible", "figure", function (f) {
          return f !== "None";
        }),
        {
          alignment: new go.Spot(0.5, 1, 0, 30), // x, y, offx, offy
          alignmentFocus: go.Spot.Top,
          width: 40,
          height: 30,
          stroke: borderColor, // 边框的颜色
        },
        new go.Binding("figure"),
        new go.Binding("fill", "figure", nodeFillConverter), // 内容的颜色
        new go.Binding("angle", "figure", function (f) {
          // 旋转角度
          return f === "OrGate" || f === "AndGate" ? -90 : 0;
        })
      ),
      $(
        go.TextBlock,
        new go.Binding("visible", "figure", function (f) {
          return f !== "None";
        }), // if we don't have a figure, don't display any choice text
        {
          alignment: new go.Spot(0.5, 1, 25, 45),
          alignmentFocus: go.Spot.Left,
          stroke: "black",
          font: "10pt Segoe UI, sans-serif",
        },
        new go.Binding("text", "choice")
      ),
      $(
        "TreeExpanderButton",
        {
          alignment: new go.Spot(0.5, 1, 0, 0),
          alignmentFocus: go.Spot.Top,
          "ButtonBorder.figure": "Rectangle",
        },
        new go.Binding("fill", "#fff")
      )
    );

    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.Orthogonal, // may be either Orthogonal or AvoidsNodes
        curve: go.Link.JumpOver,
      },
      {
        layerName: "Background",
        curviness: 20,
        corner: 5,
      },
      $(go.Shape, {
        strokeWidth: strokeWidth,
        stroke: borderColor, // 边框的颜色
      }),
      $(go.Shape, {
        toArrow: "Standard", // 箭头
        stroke: borderColor, // 边框的颜色
        fill: $(go.Brush, "Linear", {
          // 填充色
          0: borderColor,
          1: borderColor,
        }),
      })
    );

    return diagram;
  }

  onModelChange = (obj) => {
    // const insertedNodeKeys = obj.insertedNodeKeys; //新增的节点
    // const modifiedNodeData = obj.modifiedNodeData; //改变的节点
    // const removedNodeKeys = obj.removedNodeKeys; //删除的节点
    // const insertedLinkKeys = obj.insertedLinkKeys; //新增的连线
    // const modifiedLinkData = obj.modifiedLinkData; //改变的连线
    // const removedLinkKeys = obj.removedLinkKeys; //删除的连线
    // const modifiedModelData = obj.modelData;
  };

  render() {
    return (
      <ReactDiagram
        initDiagram={this.initDiagram}
        divClassName="diagram-component"
        nodeDataArray={this.state.nodeDataArray}
        onModelChange={this.onModelChange}
      />
    );
  }
}
