import { DependencyList, useEffect, useRef } from "react";

const useUpdateEffect: typeof useEffect = (effect, deps?: DependencyList) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
