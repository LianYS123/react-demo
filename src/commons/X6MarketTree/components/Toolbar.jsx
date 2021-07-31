// import { Icon } from "antd";
import React from "react";
import Icon from '@ant-design/icons'
import { useEffect, useRef, useState } from "react";

import { layout } from "../utils";

const useZoom = graph => {
  const [zoom, setZoom] = useState(1);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (graph && !mountedRef.current) {
      graph.on("scale", () => {
        setZoom(graph.zoom());
      });
      mountedRef.current = true;
    }
  }, [graph]);
  return zoom;
};

export const MyToolBar = props => {
  const { graph } = props;
  const zoom = useZoom(graph);
  const handleZoomIn = () => {
    const zoom = graph.zoom();
    if (zoom < 2) {
      graph.zoomTo(zoom + 0.2);
    }
  };
  const handleZoomOut = () => {
    const zoom = graph.zoom();
    if (zoom > 0.4) {
      graph.zoomTo(zoom - 0.2);
    }
  };

  const handleRefresh = () => {
    layout(graph);
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="refresh">
          <span style={{ cursor: "pointer" }} onClick={handleRefresh}>
            <Icon type='redo' style={{ marginRight: 4 }} /> 
            <span>刷新</span>
          </span>
        </div>
      </div>
      <div className="toolbar-right">
        <div className="zoom">
          <Icon
            onClick={handleZoomOut}
            style={{ marginRight: 8 }}
            type="minus-circle"
          />
          {parseInt(zoom * 100)} %
          <Icon
            style={{ marginLeft: 8 }}
            onClick={handleZoomIn}
            type="plus-circle"
          />
        </div>
      </div>
    </div>
  );
};
export default MyToolBar;
