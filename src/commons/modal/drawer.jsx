import React from "react";
import ReactDOM from "react-dom";
// import Drawer from '../drawer';
import { Drawer } from "antd";

const div = document.createElement("div");
document.body.appendChild(div);
div.id = "drawer1";

export function open(config) {
  ReactDOM.render(
    <Drawer
      drawerStyle={{
        marginTop: 44,
        height: "calc(100% - 44px)",
        ...(config.drawerStyle || {}),
      }}
      bodyStyle={{ padding: "0 24px" }}
      visible={true}
      title={config.title}
      width={config.width || 600}
      wrapClassName={config.wrapClassName}
      onClose={config.onCancel}
    >
      {config.content}
    </Drawer>,
    div
  );
}

export function close() {
  ReactDOM.unmountComponentAtNode(div);
}

const actions = {
  open,
  close,
};
export default actions;
