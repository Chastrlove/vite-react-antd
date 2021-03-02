import React from "react";
import ProTable, { ProTableProps, RequestData } from "@ant-design/pro-table";
import style from "./TableStyle.module.less";
import classNames from "classnames";
import { SortOrder } from "antd/es/table/interface";
import { BaseResponse } from "common/requestWrap";
import { mapProTableResponse } from "utils/mapProTableResponse";

interface TableProProps<T, U> extends Omit<ProTableProps<T, U>, "request"> {
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: {
      [key: string]: SortOrder;
    },
    filter: {
      [key: string]: React.ReactText[];
    },
  ) => Promise<BaseResponse<Array<T>>>;
}

export const TablePro = <T, U>(props: TableProProps<T, U>) => {
  const formatRequestResult = async (...args: any[]): Promise<RequestData<T>> => {
    // @ts-ignore
    const result = await props.request!(...args);
    return mapProTableResponse(result);
  };
  return (
    <ProTable<T, U>
      options={false}
      toolBarRender={false}
      {...props}
      request={props.request /*&& formatRequestResult*/}
      className={classNames(style.table, props.className)}
      pagination={
        props.pagination === false
          ? false
          : {
              className: classNames(style.pagination, props.pagination?.className),
              size: "default",
              pageSize: 10,
              showTotal: (total, range) => {
                return `第${range[0]}-${range[1]}条， 共${total}条`;
              },
              showSizeChanger: false,
              ...props.pagination,
            }
      }
    />
  );
};
