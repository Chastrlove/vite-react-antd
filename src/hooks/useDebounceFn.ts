import useCreation from "hooks/useCreation";
import _, { DebounceSettings } from "lodash";
import { useRefProps } from "./useRefProps";

type Fn = (...args: any) => any;

export const useDebounceFn = <T extends Fn>(
  fn: T,
  wait: number,
  debounceOption?: DebounceSettings
) => {
  const fnRef = useRefProps<T>(fn);
  return useCreation(
    () =>
      _.debounce<T>(
        //此处不可直接用fnRef.current，会被缓存住
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        debounceOption
      ),
    []
  );
};
