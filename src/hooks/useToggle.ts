import { useCallback, useState } from "react";

type IState = string | number | boolean | undefined;

export function useToggle<T = IState>(defaultValue: T): [T, (value?: T) => void];

export function useToggle(initialValue: boolean | (() => boolean)) {
  const [value, setValue] = useState(initialValue);
  const toggleAction = useCallback((actionValue) => {
    setValue((value) => (actionValue === undefined ? !value : actionValue));
  }, []);

  return [value, toggleAction];
}
