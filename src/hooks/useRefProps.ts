import { useRef } from "react";

export function useRefProps<T>(props: T) {
  const ref = useRef<T>(props);
  // 每次重新渲染设置值
  ref.current = props;

  return ref;
}
