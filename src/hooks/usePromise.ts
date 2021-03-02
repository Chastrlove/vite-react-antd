import { DependencyList, useCallback, useEffect, useState } from "react";
import { useRefProps } from "./useRefProps";
import { useDebounceValue } from "hooks/useDebounceValue";
import { unstable_batchedUpdates } from "react-dom";

export interface Response<T, S> {
  isLoading: boolean;
  setLoading: (value) => void;
  delayLoading: boolean;
  error?: Error;
  data?: S;
  setData: (v: S) => void;
  request: T;
}

export function usePromise<T>(
  fn: (...args: any[]) => Promise<T>,
  auto: boolean = false,
  initValue: any = undefined,
  refreshDeps: DependencyList = []
): Response<(...args: any[]) => Promise<any>, T> {
  const [data, setData] = useState<T>(initValue);
  const [isLoading, setLoading] = useState(auto);
  const fnRef = useRefProps(fn);
  const autoRef = useRefProps(auto);
  const [error, setError] = useState<Error>();

  const isLoadingDelay = useDebounceValue(isLoading, 200);

  const caller = useCallback(
    async (...args) => {
      setLoading(true);
      try {
        const result = await fnRef.current(...args);
        unstable_batchedUpdates(() => {
          setData(result);
          setLoading(false);
        });
        return Promise.resolve(result);
      } catch (err) {
        unstable_batchedUpdates(() => {
          setError(err);
          setLoading(false);
        });
        return Promise.reject(err);
      }
    },
    [fnRef]
  );

  useEffect(() => {
    //只有自动模式，才会收集依赖刷新
    autoRef.current && caller();
  }, [autoRef, caller, ...refreshDeps]);

  return {
    request: caller,
    data,
    setData,
    setLoading,
    isLoading,
    delayLoading: isLoadingDelay,
    error,
  };
}
