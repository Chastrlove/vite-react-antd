import { useState, useCallback } from "react";

/**
 * useState会直接覆盖state值。为了实现和setState一样的效果
 * @param initialState
 */
export function useSetState<S extends object>(
  initialState: S | (() => S)
): [S, (state: Partial<S> | ((state: S) => Partial<S>)) => void] {
  const [_state, _setState] = useState<S>(initialState);

  const setState = useCallback((state: Partial<S> | ((state: S) => Partial<S>)) => {
    _setState((prev: S) => {
      let nextState = state;
      if (typeof state === "function") {
        nextState = state(prev);
      }

      return { ...prev, ...nextState };
    });
  }, []);

  return [_state, setState];
}
