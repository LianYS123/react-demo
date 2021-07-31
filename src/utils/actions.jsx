import React from "react";
import Popup from "commons/modal";
import { notification, Modal } from "antd";

//确认表单
export function ConfirmAction({
  options,
  title,
  okText,
  cancelText,
  message,
  okType,
  content,
  method,
  width = 416,
  params = {}
}) {
  const onSubmit = async () => {
    const { reload } = options;
    const res = await method(params);
    if (res && res.code === "0000") {
      if (message) {
        notification.success({ message });
      }
      if (reload) {
        reload();
      }
    }
  };

  Modal.confirm({
    title,
    content,
    okText,
    okType,
    width,
    cancelText,
    onOk: onSubmit
  });
}

//自定义表单
export function CustomFormAction({
  options,
  title,
  method,
  CustomForm,
  width,
  message,
  pop = Popup
}) {
  const onSubmit = async values => {
    const { reload } = options;
    const res = await method(values);
    if (res && res.code === "0000") {
      pop.close();

      if (message) {
        notification.success({ message });
      }
      if (reload) {
        reload();
      }
    }
  };

  pop.open({
    title,
    width,
    onCancel: pop.close,
    content: (
      <CustomForm
        initialValues={options.record}
        {...options}
        onSubmit={onSubmit}
        onCancel={pop.close}
      />
    )
  });
}

//自定义表单，不带提交逻辑
export function PureAction({ options, title, CustomForm, width = 600, pop = Popup }) {
  pop.open({
    title,
    width,
    onCancel: pop.close,
    content: (
      <CustomForm
        initialValues={options.record}
        {...options}
        onCancel={pop.close}
      />
    )
  });
}
