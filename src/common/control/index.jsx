import React from "react";
import { Button } from "antd";
import classNames from "classnames";
import "./styles.less";

export const Control = ({
  className,
  style,
  options = [],
  actions,
  execCommand = (command, opts) => {
    actions[command](opts);
  },
}) => {
  return (
    <div style={style} className={classNames("l-control", className)}>
      {options
        .filter((it) => !it.hidden)
        .map(({ title, onClick, type, className, ...rest }) => {
          const { command } = rest;
          return (
            <Button
              className={classNames(className)}
              key={title}
              type={type}
              onClick={() => {
                if (onClick) {
                  onClick(rest);
                } else if (command && execCommand) {
                  execCommand(command, rest);
                }
              }}
            >
              {title}
            </Button>
          );
        })}
    </div>
  );
};

export const TableCellControl = ({
  className,
  record,
  options = [],
  ...props
}) => (
  <Control
    className={classNames("l-table-cell-control", className)}
    options={options.map((it) => ({
      record,
      type: "link",
      className: classNames(it.className, { danger: it.danger }),
      ...it,
    }))}
    {...props}
  />
);

export const ActionControl = ({ className, ...props }) => (
  <Control className={classNames("l-action-control", className)} {...props} />
);
