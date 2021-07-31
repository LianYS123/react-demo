import React, { useRef, useState } from "react";
import { Alert, Button } from "antd";
import { convertGraphToServiceData, createNodesByServiceData } from "./convert";
import { useEvents } from "./events";
import { X6MarketTree } from "commons/X6MarketTree";
import { getUtils } from "./utils";
import { fakeData, fakeEventsData } from "./fakeData";
import "@antv/x6-react-shape";

export const X6MarketEventTree = props => {
  const {
    defaultSource = fakeData.treeNode,
    initialEventType = ['user_register'],
    readOnly,
    storeIds,
    endTime,
    startTime,
    eventList = fakeEventsData,
    strategyName
  } = props;
  // console.log(props);
  const [utils, setUtils] = useState({});
  const rootRef = useRef(null);
  const [event, setEvent] = useState();

  const onMounted = utils => {
    const serviceUtils = getUtils(utils);
    const commonUtils = { ...serviceUtils, ...utils, setEvent };
    const { addRootNode } = commonUtils;
    if (defaultSource) {
      const event = initialEventType ? eventList.find(it => it.eventId === initialEventType[0]) : undefined;
      setEvent(event);
      rootRef.current = addRootNode({ event, eventList, menu: [] });
      createNodesByServiceData(commonUtils, rootRef.current, defaultSource, event);
    } else {
      rootRef.current = addRootNode();
    }
    setUtils(commonUtils);
  };

  const { connecting, handleEvent } = useEvents({ utils, event });

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* <Space> */}
      <Button
        onClick={() => {
          const res = convertGraphToServiceData(utils, rootRef.current);
          console.log(res);
        }}
      >
        export
      </Button>
      {/* </Space> */}
      {connecting && <Alert type="info" message="连线中"></Alert>}
      <X6MarketTree
        style={{ flex: 1 }}
        onMounted={onMounted}
        handleEvent={handleEvent}
      />
    </div>
  );
};

export default X6MarketEventTree;
