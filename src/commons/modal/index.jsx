import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "antd";

const div = document.createElement("div");
document.body.appendChild(div);
div.id = "modal1";

export function open(config) {
  ReactDOM.render(
    <Modal
      visible={true}
      title={config.title}
      footer={config.footer || false}
      onOk={config.onOk}
      width={config.width}
      maskClosable={config.maskClosable || false}
      keyboard={config.keyboard}
      wrapClassName={config.wrapClassName}
      onCancel={config.onCancel}
    >
      {config.content}
    </Modal>,
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
