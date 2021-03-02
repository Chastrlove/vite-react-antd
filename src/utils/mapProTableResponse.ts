import { BaseResponse } from "common/requestWrap";

export const mapProTableResponse = <T = any>(res: BaseResponse<T>) => {
  return {
    ...res,
    total: res.totalCount,
    current: res.currentPage,
    data: res.result,
  };
};
