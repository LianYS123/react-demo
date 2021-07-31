import { Button, InputNumber } from "antd";
import { useState } from "react";

export const Chance = ({ onConfirm, onCancel }) => {
  const [value, onChange] = useState(0);
  return (
    <div>
      <InputNumber value={value} onChange={onChange}></InputNumber>
      <Button
        onClick={() => {
          onConfirm({
            policyId: "TP20210514023028",
            policyName: `${value}`,
            policyValue: value,
            strategyId: "MS20210514023011",
          });
          onCancel();
        }}
      >
        确认
      </Button>
    </div>
  );
};

