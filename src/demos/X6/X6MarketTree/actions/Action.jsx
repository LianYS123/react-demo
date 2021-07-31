import { Button, Input } from "antd";
import { useState } from "react";

export const Action = ({ onConfirm, onCancel }) => {
  const [value, onChange] = useState(0);
  return (
    <div>
      <Input
        placeholder="随便输入点什么"
        onChange={(ev) => onChange(ev.target.value)}
      />
      <Button
        onClick={() => {
          onConfirm({
            cptType: "ACTION",
            nodeAdds: [
              {
                bizName: value,
                bizType: "coupon",
                bizValue: "210203379",
                priority: 5,
                strategyId: "MS20210514023011",
              },
            ],
            nodeName: "营销内容",
          });
          onCancel();
        }}
      >
        确认
      </Button>
    </div>
  );
};
