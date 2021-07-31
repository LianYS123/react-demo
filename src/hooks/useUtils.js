// eslint-disable-next-line no-unused-vars
import { useEffect, useState, useRef, useCallback, EffectCallback } from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import isEqual from 'fast-deep-equal';

/**
 * @description: setInterval的hooks实现
 * @param {Function} func 要执行的函数
 * @param {Number} interval 执行间隔
 * @param {Array} deps 依赖项
 * @return {*} clearInterval
 */
export const useInterval = (func, interval, deps = []) => {
  const timer = useRef();
  const funcRef = useRef(func);
  funcRef.current = func;
  const clear = () => clearInterval(timer.current);
  useEffect(() => {
    // @ts-ignore
    timer.current = setInterval(() => {
      funcRef.current();
    }, interval);
    return () => clearInterval(timer.current);
  }, deps);
  return clear;
};

/**
 * @description setTimeout的hooks实现
 * @param {Function} func 要执行的函数
 * @param {Number} timeout 执行间隔
 * @param {Array} deps 依赖项
 * @return {Function} clearTimeout
 */
export const useTimeout = (func, timeout, deps = []) => {
  // const [timer, setTimer] = useState();
  const timer = useRef(0);
  const funcRef = useRef(func);
  funcRef.current = func; // 每次进入hooks保存最新的执行函数
  const clear = () => clearTimeout(timer.current);
  useEffect(() => {
    timer.current = setTimeout(funcRef.current, timeout);
    return () => clearTimeout(timer.current);
  }, deps);
  return clear;
};

/**
 * @description: 放缓获取value的速率（节流）
 * @param {*} value 要节流的值
 * @param {Number} wait 节流时间间隔
 * @return {*} 放缓变化的值
 */
export const useThrottledValue = (value, wait = 100) => {
  const [throttledValue, setValue] = useState();
  const setThrottledValue = useCallback(throttle(setValue, wait), []);
  useEffect(() => {
    setThrottledValue(value);
  }, [value]);
  return throttledValue;
};

/**
 * @description: 合并一定时间内多次获取value的值（防抖）
 * @param {*} value 要节流的值
 * @param {Number} wait 节流时间间隔
 * @return {*} 处理后的值
 */
export const useDebouncedValue = (value, wait = 100) => {
  const [debouncedValue, setValue] = useState();
  const setThrottledValue = useCallback(debounce(setValue, wait), []);
  useEffect(() => {
    setThrottledValue(value);
  }, [value]);
  return debouncedValue;
};

/**
 * @description: 自定义useEffect的更新逻辑
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 * @param {Function} shouldUpdate 是否执行作用，返回true执行effect
 */
export const useShouldUpdateEffect = (effect, deps, shouldUpdate) => {
  const depsRef = useRef(deps);
  if (shouldUpdate(depsRef.current, deps)) {
    depsRef.current = deps;
  }
  useEffect(effect, depsRef.current);
};

/**
 * @description: 自定义useEffect的依赖比较逻辑
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 * @param {Function} compare 自定义比较函数
 */
export const useCustomCompareEffect = (effect, deps, compare) =>
  useShouldUpdateEffect(effect, deps, (...args) => !compare(...args));

/**
 * @description: 使用深比较的useEffect
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 */
export const useDeepCompareEffect = (effect, deps = []) => {
  return useCustomCompareEffect(effect, deps, isEqual);
};

/**
 * @description: 获取上一个值
 * @param {*} state 当前值
 * @param {Function} [compare] 比较函数, 返回true时更新上一个值，默认每次渲染都更新
 * @return {*} 前一个值
 */
export const usePrevious = (state, compare) => {
  const prevRef = useRef();
  const curRef = useRef(state);
  const shouldUpdate =
    typeof compare === 'function' ? compare(curRef.current, state) : true;
  if (shouldUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }
  return prevRef.current;
};
/**
 * @description: 组件更新时执行的事件
 * @param {Function} fn  要执行的函数
 * @param {Array} deps  依赖项
 */
export const useUpdateEffect = (fn, deps) => {
  const isMouted = useRef(false);
  useEffect(() => {
    if (isMouted.current) {
      return fn();
    } else {
      isMouted.current = true;
    }
  }, deps);
};

/**
 * @description: 组件卸载时执行的操作
 * @param {Function} fn 操作函数
 */
export const useUnmount = (fn) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    return () => {
      fnRef.current();
    };
  }, []);
};

/**
 * @description: 获取组件卸载状态
 * @return {Boolean}: 组件是否已卸载
 */
export const useIsUnmounted = () => {
  const isUnmountedRef = useRef(false);
  isUnmountedRef.current = false;
  useUnmount(() => {
    isUnmountedRef.current = true;
  });
  return isUnmountedRef.current;
};

/**
 * @description: 获取组件卸载状态
 * @return {Boolean}: 组件是否已挂载
 */
export const useIsMounted = () => !useIsUnmounted();

/**
 * @description: 值变化时打印
 * @param {array} args 打印内容
 */
export const useLog = (...args) => {
  useEffect(() => {
    console.log(...args);
  }, args);
};

/**
 * @description 真假值状态封装
 * @param {*} initialFlag 初始状态
 * @return {{ flag: Boolean, setTrue: Function, setFalse: Function, toggle: Function }}
 */
export const useFlag = (initialFlag) => {
  const [flag, setFlag] = useState(initialFlag);
  const setTrue = useCallback(() => setFlag(true), []);
  const setFalse = useCallback(() => setFlag(false), []);
  const toggle = useCallback(() => setFlag((f) => !f), []);
  return {
    flag,
    setTrue,
    setFalse,
    toggle
  };
};

/**
 * @description 弹出框状态封装
 * @param {Object} [initialProps] modal属性初始值
 * @return {{ open: Function, close: Function, visible: Boolean }}
 */
export const useModalAction = (initialProps) => {
  const { flag, setFalse, setTrue } = useFlag(false);
  const [props, setProps] = useState(initialProps || {});
  const open = useCallback((props) => {
    setTrue();
    setProps(props);
  }, []);
  const close = useCallback(() => {
    setFalse();
    setProps(initialProps);
  }, []);
  return {
    open,
    close,
    visible: flag,
    ...props
  };
};