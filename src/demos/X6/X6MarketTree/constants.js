/**
 * 决策点节点的类型
 * @type {{USER_TAG: string, ORDER_AMT: string, CUSTOMER_GROUP: string, CHANCE: string, RECHARGE_AMT: string}}
 */
export const DECISION_TYPE = {
    // 概率节点
  CHANCE: "CHANCE",
  // 标签
  USER_TAG: "TAG",
  // 分数
  SCORE: "SCORE",
  // 客群
  CUSTOMER_GROUP: "GROUP_USER",
  // 订单金额节点
  ORDER_AMT: "PAY_AMT",
  // 充值金额节点
  RECHARGE_AMT: "RECHARGE_AMT",
  // 指定商品

  // 营销内容
  ACTION: 'ACTION'
};

export const BaseTitleMap = {
  [DECISION_TYPE.CHANCE]: "概率",
  [DECISION_TYPE.CUSTOMER_GROUP]: "客群",
  [DECISION_TYPE.ORDER_AMT]: "订单金额",
  [DECISION_TYPE.RECHARGE_AMT]: "充值金额",
  [DECISION_TYPE.USER_TAG]: "标签",
  [DECISION_TYPE.ACTION]: "营销内容",
};

export const BaseContentMap = {
  [DECISION_TYPE.CHANCE]: "根据概率",
  [DECISION_TYPE.CUSTOMER_GROUP]: "",
  [DECISION_TYPE.ORDER_AMT]: "",
  [DECISION_TYPE.RECHARGE_AMT]: "",
  [DECISION_TYPE.USER_TAG]: "",
};