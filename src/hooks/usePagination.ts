import { usePromise } from "./usePromise";
import { BaseResponse } from "common/requestWrap";
import { PaginationConfig } from "antd/lib/pagination";
import { useEffect, useMemo } from "react";
import { useImmer } from "hooks/useImmer";

type Service<T> = (pageProps: PaginationConfig) => Promise<BaseResponse<T>>;

export const usePagination = <T>(service: Service<T>, defaultPageSize: number) => {
  const { data, isLoading, request } = usePromise(service);

  const requestAction = (page: number, pageSize?: number) => {
    updatePage((pagination) => {
      pagination.current = page;
      request(pagination);
    });
  };

  const [pagination, updatePage] = useImmer<PaginationConfig>({
    current: 1,
    pageSize: defaultPageSize,
    showSizeChanger: false,
    defaultCurrent: 1,
    total: 0,
    onChange: requestAction,
    showQuickJumper: false,
  });

  const hasPageNation = useMemo(() => {
    if (!pagination) {
      return false;
    }
    const { total = 0, pageSize = defaultPageSize } = pagination;

    if (total === 0) {
      return false;
    }

    return total > pageSize;
  }, [defaultPageSize, pagination]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { totalCount,currentPage } = data as BaseResponse;
    updatePage((pagination) => {
      pagination.total = totalCount;
      pagination.current=currentPage
    });
  }, [data, updatePage]);

  return { loading: isLoading, pagination, res: data, run: request, hasPageNation };
};
