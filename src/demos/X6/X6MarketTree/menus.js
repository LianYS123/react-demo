import { DECISION_TYPE } from "./constants";

const fakeEventsData = [
  { eventId: "user_register", eventName: "注册成功" },
  { eventId: "consume_success", eventName: "门店消费成功" },
  { eventId: "online_consume_success", eventName: "线上商城消费成功" },
  { eventId: "recharge_success", eventName: "充值成功" },
];

// 根节点目录
export const getRootMenu = (eventsData = fakeEventsData) => {
  return eventsData.map((it) => {
    const { eventId, eventName } = it;
    return {
      title: eventName,
      key: eventId,
      command: "setRootMenu",
      event: it,
    };
  });
};

// 未设置时的menu
export const getSettingMenu = (event = {}) => {
  const { eventId } = event;
  const isUserRegister = eventId === "user_register"; //注册成功
  const isRechargeSuccess = eventId === "recharge_success"; //充值成功
  const children = [
    {
      title: "概率",
      command: "setTargetCustomer",
      cptType: DECISION_TYPE.CHANCE,
    },
    {
      title: "用户标签",
      command: "setTargetCustomer",
      cptType: DECISION_TYPE.USER_TAG,
    },
    {
      title: "客群",
      command: "setTargetCustomer",
      cptType: DECISION_TYPE.CUSTOMER_GROUP,
    },
    {
      title: "订单金额",
      command: "setTargetCustomer",
      cptType: DECISION_TYPE.ORDER_AMT,
      hidden: isRechargeSuccess || isUserRegister,
    },
    // {
    //   title: "指定商品",
    //   command: "setTargetCustomer",
    //   cptType: DECISION_TYPE.CHANCE,
    //   hidden: isRechargeSuccess || isUserRegister,
    // },
  ].filter((it) => !it.hidden);
  const menu = [
    {
      title: "目标客户",
      children,
    },
    {
      title: "营销内容",
      command: "setAction",
      cptType: "ACTION",
    },
    {
      title: `删除`,
      command: "delete",
    },
  ];
  return menu;
};

// 决策点已设置时的menu
export const getBaseMenu = (nodeData) => {
  const { nodeName, cptType } = nodeData;
  return [
    {
      title: `新增${nodeName}分支`,
      command: "addBranch",
      cptType
    },
    {
      title: `编辑${nodeName}业务`,
      command: "editBranch",
      cptType
    },
    {
      title: `连线`,
      command: "connectStart",
    },
    {
      title: `删除`,
      command: "delete",
    },
  ];
};

export const getNodeMenu = (nodeData) => getBaseMenu(nodeData);

export const getMenu = (nodeData, event) => {
  const { cptType } = nodeData;
  if (cptType === DECISION_TYPE.ACTION) {
    return getSettingMenu();
  } else {
    return getBaseMenu(nodeData, event);
  }
};
