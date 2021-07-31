import React from "react";
import { Tabs } from "antd";
import { BaseQuadrant } from "./Base";

const getRandomData = (count = 10, range = 2) => {
  const dataset = Array.from(Array(count)).reduce((pre, cur) => {
    const x = (Math.random() * range).toFixed(2);
    const y = (Math.random() * range).toFixed(2);
    return [
      ...pre,
      {
        x,
        y,
        desc: `desc: ${x}, ${y}`,
        tip: `tip: ${x}, ${y}`,
      },
    ];
  }, []);
  return dataset;
};

// 商品报告，带连线
const GoodsReport = () => {
  const datas = getRandomData(4);
  return <BaseQuadrant id="goodsReport" datas={datas} withLine={true} />;
};

// 品类报告
const CategoryReport = () => {
  const datas = getRandomData();
  return <BaseQuadrant id="categoryReport" datas={datas} />;
};

export const Quadrant = () => {
  return (
    <Tabs>
      <Tabs.TabPane tab="商品图" key="1">
        <GoodsReport />
      </Tabs.TabPane>
      <Tabs.TabPane tab="品类图" key="2">
        <CategoryReport />
      </Tabs.TabPane>
    </Tabs>
  );
};
