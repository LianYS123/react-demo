import React from "react";
import Pie from "components/Pie";

const PieDemo = () => (
  <div className="diagram-component">
    <Pie
      data={[
        { value: 1048, name: "搜索引擎" },
        { value: 735, name: "直接访问" },
        { value: 580, name: "邮件营销" },
        { value: 484, name: "联盟广告" },
        { value: 300, name: "视频广告" },
      ]}
      title="test"
      subTitle="subTitle"
      style={{
          height: 500
      }}
    />
  </div>
);

export default PieDemo;
