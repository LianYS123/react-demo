import React, { useState } from "react";
// import Icon from "@ant-design/icons";
import { Popover, Menu } from "antd";
import classNames from "classnames";

const { Item: MenuItem, SubMenu } = Menu;

export const NODE_WIDTH = 180;
export const NODE_HEIGHT = 80;
const colors = ["green", "blue", "purple"];

const NodeMenu = ({ eventRef, menu = [], node }) => {
  const getMenuContent = menu => {
    return menu.map(it => {
      const { title, key, children } = it;
      if (Array.isArray(children) && children.length) {
        return (
          <SubMenu
            style={{ margin: 0 }}
            // icon={icon ? <Icon type={icon} /> : null}
            title={title}
            key={title || key}
          >
            {getMenuContent(children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem
          // icon={icon ? <Icon type={icon} /> : undefined}
          onClick={() => eventRef.current(node, it)}
          style={{ margin: 0 }}
          key={title || key}
        >
          {title}
        </MenuItem>
      );
    });
  };
  return (
    <Menu
      style={{
        borderRight: 0
      }}
      selectedKeys={[]}
    >
      {getMenuContent(menu)}
    </Menu>
  );
};

export const MarketNode = props => {
  const { node, eventRef } = props;
  const nodeData = node.getData();
  const {
    visible,
    nodeName,
    image = "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ",
    color,
    menu = [],
    content
  } = nodeData;

  const [mouseover, setMouseover] = useState(false);

  const isBaseColor = !!colors.includes(color);
  const handleNodeClick = () => {
    eventRef.current(node, {
      command: "connectEnd"
    });
  };

  return (
    <div
      onMouseEnter={() => setMouseover(true)}
      onMouseLeave={() => setMouseover(false)}
      onClick={handleNodeClick}
      className={classNames("x6-market-tree-node", {
        [`bg-light-${color}`]: isBaseColor
      })}
      style={{
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        opacity: visible,
        backgroundColor: isBaseColor ? undefined : color
      }}
    >
      <div className={classNames("left-image", color)}>
        <img src={image} alt={nodeName} />
      </div>
      <div className="x6-market-tree-node-wrapper">
        <div className="node-content">
          <div className="node-info">
            <div className="title">{nodeName}</div>
            {/* <div className="sub">{sub}</div> */}
            <div className="sub">{content}</div>
          </div>
        </div>
        {menu.length ? (
          <Popover
            placement="rightTop"
            // trigger="click"
            overlayClassName="x6-market-tree-popover"
            content={<NodeMenu eventRef={eventRef} node={node} menu={menu} />}
          >
            <div className="add-icon" onClick={e => e.stopPropagation()}>
              <div
                className={classNames("add-icon-content", {
                  "add-icon-show": mouseover,
                  [`bg-deep-${color}`]: isBaseColor
                })}
              ></div>
              {/* <div className="add-icon-menu-hover"></div> */}
            </div>
          </Popover>
        ) : null}
      </div>
    </div>
  );
};
