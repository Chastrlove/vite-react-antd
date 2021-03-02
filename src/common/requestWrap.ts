import { message } from "antd";
import _ from "lodash";

export interface BaseResponse<T = any> {
  status: number;
  success: boolean;
  result: T;
  totalPage?: number;
  totalCount?: number;
  pageSize?: number;
  currentPage: number;
}

interface RequestWrap {
  requestAction: () => Promise<BaseResponse>;
  successMsg?: string;
  errorMsg?: string;
  loading?: (bool: boolean) => void;
  afterRequest?: () => void;
}

const requestWrap = async (requestProps: RequestWrap) => {
  const { requestAction, successMsg, errorMsg, loading, afterRequest } = requestProps;

  if (_.isFunction(loading)) {
    loading(true);
  }

  try {
    const response = await requestAction();
    if (response.success) {
      message.success(successMsg || "请求成功");
      if (_.isFunction(afterRequest)) {
        afterRequest();
      }
    } else {
      message.error(errorMsg || "请求失败");
    }
  } catch (e) {
    console.error(e.toString());
  } finally {
    if (_.isFunction(loading)) {
      loading(false);
    }
  }
};

export default requestWrap;
