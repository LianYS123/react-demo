import Echarts from "echarts-for-react";
import React, { useMemo } from "react";

const Pie = ({ data, title, subTitle, ...props }) => {
  const option = useMemo(
    () => ({
      title: {
        text: title,
        subtext: subTitle,
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          type: "pie",
          radius: "50%", //调整图的大小
          // center: [], //调整图的位置
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }),
    [data, title, subTitle]
  );

  return <Echarts {...props} option={option} />; //style调整宽高
};

export default Pie;
