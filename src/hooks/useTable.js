import { useState, useEffect, useCallback } from "react";
import { useDeepCompareEffect } from "./useUtils";
import { useRequest } from "./useRequest";

const defaultFormatter = ({ data = [], total } = {}) => {
  return { total: total || data.length, dataSource: data };
};

/**
 * @description: 处理分页状态的hooks
 * @param {Object} config
 * @param {*} config.defaultPageSize 默认分页大小
 * @param {*} config.total 总数据条数
 * @return {*} pagination
 */
export const usePagination = ({ defaultPageSize, total }) => {
  const [{ current, pageSize }, onChangePaination] = useState({
    current: 1,
    pageSize: defaultPageSize
  });
  const onChange = (current, pageSize) => {
    onChangePaination({
      current,
      pageSize
    });
  };
  const pagination = {
    current,
    pageSize,
    total,
    onChange,
    onShowSizeChange: onChange
  };
  return pagination;
};

const useRowSelection = customConfig => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowSelection, setRowSelection] = useState(customConfig);
  const onChange = useCallback(keys => setSelectedRowKeys(keys), []);
  useDeepCompareEffect(() => {
    const baseSelection = {
      selectedRowKeys,
      onChange,
      preserveSelectedRowKeys: true,
      selections: false
    };
    if (!customConfig) {
      setRowSelection();
    } else if (customConfig === true) {
      setRowSelection(baseSelection);
    } else {
      setRowSelection({
        ...baseSelection,
        ...customConfig
      });
    }
  }, [selectedRowKeys, customConfig]);
  return rowSelection;
};

/**
 * @description: 封装方便antd table使用的hooks
 * @param {Object} options 配置信息
 * @param {Function} options.method 请求方法
 * @param {Number} [options.defaultPageSize = 10] 默认分页大小
 * @param {Object} [options.necessaryParams] 必要请求参数
 * @param {Object|Boolean} [options.rowSelection] 选择功能配置, 传true使用默认
 * @param {Function} [options.formatter] 请求结果数据转换函数, 返回{total, dataSource}
 */
export const useTable = options => {
  const {
    method,
    defaultPageSize = 10,
    necessaryParams = {},
    formatter = defaultFormatter,
    rowSelection: customConfig,
    pageFieldName = "pageNo",
    pageSizeFieldName = "pageSize",
    ...rest
  } = options;

  const [total, setTotal] = useState(10);
  const [dataSource, setSource] = useState([]);

  const pagination = usePagination({
    total,
    defaultPageSize
  });

  const rowSelection = useRowSelection(customConfig);

  const { data, loading, ...restState } = useRequest({
    method,
    necessaryParams: {
      ...necessaryParams,
      [pageFieldName]: pagination.current,
      [pageSizeFieldName]: pagination.pageSize
    },
    ...rest
  });

  useEffect(() => {
    const { total, dataSource } = formatter(data);
    setTotal(total);
    setSource(dataSource);
  }, [data]);

  const tableProps = {
    dataSource,
    loading,
    pagination,
    rowSelection
  };

  return {
    loading,
    data,
    pagination,
    tableProps,
    ...restState
  };
};
