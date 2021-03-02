import { useEffect, useRef } from "react";
import useBoolean from "./useBoolean";
import { getTargetElement, BasicTarget } from "utils/dom";

export interface Options {
  onEnter?: (event:MouseEvent) => void;
  onLeave?: (event:MouseEvent) => void;
}

const useHover = (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave } = options || {};

  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  const onLeaveRef = useRef(onLeave);
  onLeaveRef.current = onLeave;

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEffect(() => {
    const onMouseEnter = (e) => {
      if (onEnterRef.current) onEnterRef.current(e);
      setTrue();
    };
    const onMouseLeave = (e) => {
      if (onLeaveRef.current) onLeaveRef.current(e);
      setFalse();
    };

    const targetElement = getTargetElement(target);
    // 如果 传入dom
    if (targetElement) {
      targetElement.addEventListener("mouseenter", onMouseEnter);
      targetElement.addEventListener("mouseleave", onMouseLeave);
      return () => {
        targetElement.removeEventListener("mouseenter", onMouseEnter);
        targetElement.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [typeof target === "function" ? undefined : target]);

  return state;
};

export default useHover;
