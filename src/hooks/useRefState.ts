import { useCallback, useRef, useState } from "react";

export function useRefState(initialState) {
  const ins = useRef();

  const [state, setState] = useState(() => {
    // 初始化
    const value = typeof initialState === "function" ? initialState() : initialState;
    ins.current = value;
    return value;
  });

  const setValue = useCallback(value => {
    if (typeof value === "function") {
      setState(prevState => {
        const finalValue = value(prevState);
        ins.current = finalValue;
        return finalValue;
      });
    } else {
      ins.current = value;
      setState(value);
    }
  }, []);

  return [state, setValue, ins];
}
