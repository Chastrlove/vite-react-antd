import { useCallback, useRef } from "react";

export type noop = (...args: any[]) => any;

const noop = function () {};

function usePersistFn<T extends noop>(fn?: T) {
  const ref = useRef<any>(() => {
    throw new Error("Cannot call function while rendering.");
  });

  ref.current = fn || noop;

  return useCallback(((...args) => ref.current(...args)) as T, [ref]);
}

export default usePersistFn;
