import { useEffect, useRef, useState } from "react";

type LoadingDelay = {
  loading?: boolean;
  delay?: number;
};

export const useLoadingDelay = ({ loading, delay }: LoadingDelay) => {
  const delayTimeoutRef = useRef<number>();
  const [innerLoading, setLoading] = useState<boolean>(!!loading);

  let loadingOrDelay = !!loading;

  useEffect(() => {
    clearTimeout(delayTimeoutRef.current);
    if (typeof delay === "number") {
      delayTimeoutRef.current = window.setTimeout(() => {
        setLoading(loadingOrDelay);
      }, delay);
    } else {
      setLoading(loadingOrDelay);
    }
    return () => {
      clearTimeout(delayTimeoutRef.current);
    };
  }, [delay, loadingOrDelay]);

  return [innerLoading];
};
