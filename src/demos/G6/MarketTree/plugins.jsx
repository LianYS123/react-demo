import React from "react";
import ReactDOM from "react-dom";
import { Menu } from "antd";
import G6 from "@antv/g6";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Item: MenuItem } = Menu;

// 插件

// 提示框
export const tooltip = new G6.Tooltip({
  // offsetX and offsetY include the padding of the parent container
  offsetX: 20,
  offsetY: 30,
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ["node"],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const outDiv = document.createElement("div");
    //outDiv.style.padding = '0px 0px 20px 0px';
    const nodeName = e.item.getModel().label;
    let formatedNodeName = "";
    for (let i = 0; i < nodeName.length; i++) {
      formatedNodeName = `${formatedNodeName}${nodeName[i]}`;
      if (i !== 0 && i % 20 === 0)
        formatedNodeName = `${formatedNodeName}<br/>`;
    }
    outDiv.innerHTML = `${formatedNodeName}`;
    return outDiv;
  },
  shouldBegin: (e) => {
    if (e.target.get("name") === "name-shape") return true;
    return false;
  },
});

const MenuContext = ({ onChange }) => {
  return (
    <ul className="context-menu">
      <li type="add">新增概率分支</li>
      <li type="edit">编辑概率业务</li>
      <li type="delete">删除</li>
    </ul>
  );
  // return (
  //   <Menu onClick={console.log}>
  //     <MenuItem onClick={() => onChange("add")} icon={<PlusCircleOutlined />}>
  //       新增概率分支
  //     </MenuItem>
  //     <MenuItem onClick={() => onChange("edit")} icon={<EditOutlined />}>
  //       编辑概率业务
  //     </MenuItem>
  //     <MenuItem onClick={() => onChange("delete")} icon={<DeleteOutlined />}>
  //       删除
  //     </MenuItem>
  //   </Menu>
  // );
};

// 菜单栏
export const menu = new G6.Menu({
  offsetX: 0,
  offsetY: 0,
  itemTypes: ["node"],
  className: "g6-menu-wrapper",
  getContent(e) {
    const outDiv = document.createElement("div");
    ReactDOM.render(<MenuContext />, outDiv);
    return outDiv;
  },
  handleMenuClick(target, item, graph) {
    const { type } = target;
    if (type === "delete") {
      console.log(item);
      graph.removeChild(item.id);
    }
  },
});
