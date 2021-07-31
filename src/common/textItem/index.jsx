import React from "react";
import { Row, Col } from "antd";
import "./styles.less";
import classNames from "classnames";

export const TextItem = ({
  label,
  labelCol = { span: 6 },
  wrapperCol = { span: 18 },
  colon = true,
  children,
  style,
  className
}) => {
  return (
    <Row className={classNames("l-text-item", className)} style={style}>
      <Col className="l-text-item-label-col" {...labelCol}>
        <span
          className={classNames("l-text-item-label", {
            "l-text-item-label-colon": colon
          })}
        >
          {label}
        </span>
      </Col>
      <Col {...wrapperCol}>{children}</Col>
    </Row>
  );
};

export const TextItemGroup = ({
  columns = [],
  record = {},
  className,
  style,
  ...rest
}) => {
  const fields = columns.map(({ title, dataIndex }) => {
    return {
      key: title,
      label: title,
      value: record[dataIndex]
    };
  });
  return (
    <div className={classNames("l-text-item-group", className)} style={style}>
      {fields.map((it, index) => (
        <TextItem key={it.key || it.label} {...it} {...rest}>
          {it.render ? it.render(it, index) : it.value}
        </TextItem>
      ))}
    </div>
  );
};

export default TextItem;
