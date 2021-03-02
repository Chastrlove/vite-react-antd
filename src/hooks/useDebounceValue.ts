import { useEffect, useRef, useState } from "react";
import { useDebounceFn } from "hooks/useDebounceFn";

export const useDebounceValue = (value, wait) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const run = useDebounceFn(() => {
    setDebounceValue(value);
  }, wait);
  useEffect(() => {
    run();
  }, [run, value]);
  return debounceValue;
};
