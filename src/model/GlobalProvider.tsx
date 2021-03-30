import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInit, InitStateModelKey } from "./InitStateStore";
import { Executor } from "./utils/Executor";
import isEqual from "fast-deep-equal";
import { Dispatcher } from "./utils/Dispatcher";
import usePersistFn from "hooks/usePersistFn";

const GlobalStateContext = createContext<Dispatcher>({} as any);

export const GlobalStateProvider = GlobalStateContext.Provider;

export const models = { [InitStateModelKey]: useInit };

export type Model<T extends keyof typeof models> = {
  [key in keyof typeof models]: ReturnType<typeof models[T]>;
};

export type Models<T extends keyof typeof models> = Model<T>[T];

export function useModel<T extends keyof Model<T>>(model: T): Model<T>[T];
export function useModel<T extends keyof Model<T>, U>(
  model: T,
  selector: (model: Model<T>[T]) => U
): U;

export function useModel<T extends keyof Model<T>, U>(
  namespace: T,
  onUpdate?: (model: Model<T>[T]) => U
): typeof onUpdate extends undefined
  ? Model<T>[T]
  : ReturnType<NonNullable<typeof onUpdate>> {
  const updater = usePersistFn(onUpdate);

  const dispatchContext = useContext(GlobalStateContext);
  const [state, setState] = useState(() => {
    return onUpdate
      ? updater(dispatchContext.data[namespace])
      : dispatchContext.data[namespace];
  });

  const stateRef = useRef<any>(state);
  stateRef.current = state;

  const isMount = useRef(false);

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    const handler = (value) => {
      if (!isMount.current) {
        // 如果 handler 执行过程中，组件被卸载了，则强制更新全局 data
        setTimeout(() => {
          dispatcher.onUpdate(namespace, value);
        });
      } else {
        if (onUpdate && updater) {
          const currentState = updater(value);
          const previousState = stateRef.current;
          if (!isEqual(currentState, previousState)) {
            setState(currentState);
          }
        } else {
          setState(value);
        }
      }
    };
    try {
      dispatcher.callbacks[namespace].add(handler);
      dispatcher.runCallbacks(namespace);
    } catch (e) {
      dispatcher.callbacks[namespace] = new Set();
      dispatcher.callbacks[namespace].add(handler);
      dispatcher.runCallbacks(namespace);
    }
    return () => {
      dispatcher.callbacks[namespace].delete(handler);
    };
  }, [namespace]);
  return state;
}

const dispatcher = new Dispatcher();

export const GlobalProvider = (props) => {
  const { children } = props;

  return (
    <GlobalStateProvider value={dispatcher}>
      {Object.entries(models).map(([namespace, hook]) => {
        return (
          <Executor
            key={namespace}
            namespace={namespace}
            hook={hook}
            onUpdate={(value) => {
              dispatcher.onUpdate(namespace, value);
            }}
          />
        );
      })}
      {children}
    </GlobalStateProvider>
  );
};
