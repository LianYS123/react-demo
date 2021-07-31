import React from "react";
import { Drawer } from "antd";
import Icon from '@ant-design/icons'
import PropTypes from "prop-types";

import "./index.less";

export { default as Footer } from "./Footer";
function CommonDrawer(props) {
  const { showDrawerIcon = true, children, ...rest } = props;
  const { onClose } = rest;

  return (
    <Drawer {...rest}>
      {!!showDrawerIcon && (
        <div className="commonDrawer-icon" onClick={onClose}>
          <Icon
            type="right"
            style={{ position: "relative", left: "-12px", color: "#c1c1c1" }}
          />
        </div>
      )}
      {children}
    </Drawer>
  );
}

CommonDrawer.propTypes = {
  showDrawerIcon: PropTypes.bool
};

export default CommonDrawer;
