import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { getQuadrantConfig } from "./config";
import { Tooltip } from "antd";

const useTip = () => {
  const [tip, setTip] = useState();
  const [tipPosition, setTipPosition] = useState({});
  const showTip = (ev, tip) => {
    setTip(tip);
    const rect = ev.currentTarget.getBoundingClientRect();
    // console.log(rect);
    setTipPosition(rect);
  };
  const hideTip = () => {
    setTip();
  };
  return {
    tip,
    tipPosition,
    showTip,
    hideTip,
  };
};

// 象限图
export const BaseQuadrant = ({
  datas = [], // 数据集
  withLine = false, // 数据节点间是否连线
  width = 800,
  height = 800,
  imageSize = 50, // 节点图片大小
  xRange, // x轴范围, 不传根据数据集计算
  yRange, // y轴范围, 不传根据数据集计算
  // xRange = [0, 2], // x轴范围, 不传根据数据集计算
  // yRange = [0, 2], // y轴范围, 不传根据数据集计算
  tags = [
    {
      text: "小众商品",
    },
    {
      text: "爆款商品",
    },
    {
      text: "问题商品",
    },
    {
      text: "大众商品",
    },
  ], // 象限中间的标签
  id = "quadrant-svg", // 渲染多个象限图时必须传不同的id
}) => {
  const { tip, tipPosition, showTip, hideTip } = useTip();
  const {
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
  } = getQuadrantConfig({
    datas,
    width,
    height,
    xRange,
    yRange,
  });

  // 渲染坐标轴
  useEffect(() => {
    const svg = d3.select(`#${id}`);
    const xAxisEl = svg.append("g");
    xAxisEl
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height - padding})`)
      .call(xAxis);

    const yAxisEl = svg.append("g");
    yAxisEl
      .attr("class", "axis")
      .attr("transform", `translate(${padding}, 0)`)
      .call(yAxis);
    return () => {
      xAxisEl.remove();
      yAxisEl.remove();
    };
  }, [datas]);

  const blocks = [
    {
      fill: "#ECF7F2",
      tag: {
        fill: "#60DBA5",
        ...tags[0],
        targetPoint: [-tagWidth, -tagHeight],
        transform: `translate(${-tagWidth}, ${-tagHeight})`,
      },
      // transform: `translate(${})`
    },
    {
      fill: "#FBF6E6",
      tag: {
        fill: "#F5BF18",
        ...tags[1],
        targetPoint: [tagWidth, -tagHeight],
        transform: `translate(${0}, ${-tagHeight})`,
      },
      transform: `translate(${blockWidth}, 0)`,
    },
    {
      fill: "#F4E7E4",
      tag: {
        fill: "#E97C63",
        ...tags[2],
        targetPoint: [tagWidth, tagHeight],
        transform: `translate(${0}, ${0})`,
      },
      transform: `translate(0, ${blockHeight})`,
    },
    {
      fill: "#E5EBF6",
      tag: {
        fill: "#719EF8",
        ...tags[3],
        targetPoint: [-tagWidth, tagHeight],
        transform: `translate(${-tagWidth}, ${0})`,
      },
      transform: `translate(${blockWidth}, ${blockHeight})`,
    },
  ];

  return (
    <div id="quadrant-container">
      <svg
        id={id}
        style={{ width: width, height: height }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <rect id="bg-rect" width={blockWidth} height={blockHeight} />
          <marker
            id="triangle"
            markerUnits="strokeWidth"
            markerWidth="5"
            markerHeight="4"
            fill={lineColor}
            refX="0"
            refY="2"
            orient="auto"
          >
            <path d="M 0 0 L 5 2 L 0 4 z" />
          </marker>
        </defs>
        <g
          style={{ width, height }}
          transform={`translate(${padding}, ${padding})`}
        >
          {blocks.map(({ fill, transform }, index) => (
            <use
              key={index}
              xlinkHref="#bg-rect"
              fill={fill}
              transform={transform}
            />
          ))}
          <g transform={`translate(${blockWidth},${blockHeight})`}>
            {blocks.map(({ tag: { fill, text, transform } }, index) => (
              // <path />
              <g key={index} transform={transform}>
                <rect fill={fill} width={tagWidth} height={tagHeight} />
                <text
                  transform={`translate(${tagWidth / 2},${tagHeight / 2})`}
                  style={{
                    textAnchor: "middle",
                    dominantBaseline: "middle",
                    fill: "white",
                    fontSize: 14,
                    fontWeight: 400,
                    // color: "white",
                  }}
                >
                  {text}
                </text>
              </g>
            ))}
          </g>
        </g>
        <g transform={`translate(${-padding / 2},${-padding / 2})`}>
          {datas.map(({ x, y, tip, desc }, index) => {
            return (
              <g
                key={index}
                onMouseOver={(event) => showTip(event, tip)}
                onMouseOut={() => hideTip()}
                transform={`translate(${xScale(x)},${yScale(y)})`}
              >
                <image
                  width={imageSize}
                  height={imageSize}
                  key={index}
                  xlinkHref="https://img.yunatop.com/038900034078.jpg"
                />
                {/* <circle
                  transform={`translate(${imageSize / 2},${imageSize / 2})`}
                  r="5"
                /> */}
                <g transform={`translate(${0},${imageSize + 12})`}>
                  <text style={{ fontSize: 12 }}>{desc}</text>
                </g>
              </g>
            );
          })}
          {withLine && (
            <path
              transform={`translate(${imageSize / 2},${imageSize / 2})`}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
              // markerMid="url(#triangle)"
              markerEnd="url(#triangle)"
              d={linePath(datas)}
            />
          )}
        </g>
      </svg>
      {tip &&
        tipPosition &&
        ReactDOM.createPortal(
          <Tooltip title={tip} visible={true}>
            <div
              style={{
                position: "absolute",
                width: 0,
                height: 0,
                left: tipPosition.left + imageSize / 2,
                top: tipPosition.top,
              }}
            >
              {/* {tip} */}
            </div>
          </Tooltip>,
          document.body
        )}
    </div>
  );
};
