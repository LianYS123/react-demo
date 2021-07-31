import React from "react";
import Bar from 'components/Bar';

const BarDemo = () => (
  <div className="diagram-component">
    <Bar
      data={[
        120,
        {
          value: 200,
          itemStyle: {
            color: "red",
          },
        },
        150,
        80,
        70,
        110,
        130,
      ]}
      title="Bar Demo"
      style={{
          height: 500
      }}
    />
  </div>
);

export default BarDemo;
