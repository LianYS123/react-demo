import pop from "commons/modal/drawer";
import { Chance } from "./Chance";
import { Action } from "./Action";
import { Tag } from "./Tag";
import { PureAction } from "utils/actions";

export const actions = {
  TAG: (options) => {
    PureAction({
      options,
      title: "标签",
      CustomForm: Tag,
      pop,
    });
  },
  CHANCE: (options) => {
    PureAction({
      options,
      title: "概率",
      CustomForm: Chance,
      pop,
    });
  },
  ACTION: (options) => {
    PureAction({
      options,
      title: "营销内容",
      CustomForm: Action,
      pop,
    });
  },
  //   // 标签
  //   USER_TAG: "TAG",
  //   // 分数
  //   SCORE: "SCORE",
  //   // 客群
  //   CUSTOMER_GROUP: "GROUP_USER",
  //   // 订单金额节点
  //   ORDER_AMT: "PAY_AMT",
  //   // 充值金额节点
  //   RECHARGE_AMT: "RECHARGE_AMT",
  //   // 营销内容
  //   ACTION: "ACTION",
};
