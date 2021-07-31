import Echarts from "echarts-for-react";
import React, { useMemo } from "react";

// xAxis x轴数据
// data 树状图数据
const Bar = ({ data, title, subTitle, xAxis, ...props }) => {
  const option = useMemo(
    () => ({
      title: {
        text: title,
        subtext: subTitle,
        left: "center",
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data,
          type: "bar",
        },
      ],
    }),
    [data, title, subTitle, xAxis]
  );

  return <Echarts {...props} option={option} />;
};

export default Bar;
