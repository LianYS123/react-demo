import { message, Button } from "antd";

export const MessageDemo = () => {
  return (
    <Button
      onClick={() => {
        message.info("发送成功", 0);
      }}
    >
        点击发送
    </Button>
  );
};
