import React, { useEffect, useMemo, useRef } from "react";
import usePersistFn from "hooks/usePersistFn";

interface ExecutorProps {
  hook: () => any;
  onUpdate: (val: any) => void;
  namespace: string;
}

export const Executor = (props: ExecutorProps) => {
  const { hook, onUpdate, namespace } = props;
  const onUpdateFn = usePersistFn(onUpdate);

  const initialLoad = useRef(false);
  let data;
  try {
    data = hook();
  } catch (e) {
    console.error(e);
  }

  // 首次执行时立刻返回初始值
  useMemo(() => {
    onUpdateFn(data);
    initialLoad.current = false;
  }, []);

  useEffect(() => {
    if (initialLoad.current) {
      onUpdateFn(data);
    } else {
      initialLoad.current = true;
    }
  });
  return <React.Fragment />;
};
