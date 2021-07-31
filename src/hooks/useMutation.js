import { useState, useRef } from "react";

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} method 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useMutation = (method, initialData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const methodRef = useRef(method);
  methodRef.current = method;

  const loadData = async (...params) => {
    try {
      setLoading(true);
      const res = await methodRef.current(...params);
      setLoading(false);
      if (res.code === "0000") {
        setData(res);
      }
    } catch (e) {
      setLoading(false);
      setError(e);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return [loadData, { loading, error, data }];
};
