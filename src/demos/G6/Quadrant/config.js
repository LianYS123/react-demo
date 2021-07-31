import * as d3 from "d3";

// 象限图配置
export const getQuadrantConfig = ({ datas, width = 800, height = 800, xRange = [], yRange = [] }) => {
  const padding = 50;
  const lineColor = "#249A9B";

  const blockWidth = width / 2 - padding;
  const blockHeight = height / 2 - padding;
  const tagWidth = 76;
  const tagHeight = 26;

  const tagRadius = 5;

  // const xMin = d3.min(datas, (d) => d[0]);
  const xMin = xRange[0] || 0;
  const xMax = xRange[1] || d3.max(datas, (d) => d.x);
  // const yMin = d3.min(datas, (d) => d[1]);
  const yMin = yRange[0] || 0;
  const yMax = yRange[1] || d3.max(datas, (d) => d.y);
  const xScale = d3
    .scaleLinear()
    .range([padding, width - padding])
    .domain([xMin, xMax]); // 返回一个计算点坐标的函数
  const yScale = d3
    .scaleLinear()
    .range([height - padding, padding])
    .domain([yMin, yMax]);
  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale).ticks(5);
  const linePath = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  return {
    width,
    height,
    datas,
    xScale,
    yScale,
    xAxis,
    yAxis,
    padding,
    linePath,
    lineColor,
    tagWidth,
    tagHeight,
    blockWidth,
    blockHeight,
  };
};
